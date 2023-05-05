 import { AbortController } from "@aws-sdk/abort-controller";
import axios from "axios";
import { BucketFileDocument } from "bucket-types/models/BucketFile";
import { FileRouteTypes } from "bucket-types/routes/file";
import { NotFoundError, ObjectValidationError } from "custom-error";
import producer from "events/producer";
import fs from "fs-extra";
import { resolvePath } from "init";
import BucketFile from "models/BucketFile";
import {
  deleteBucketFile,
  getBucketFileStream,
  uploadBucketFile,
} from "s3Client";
import { ACCESS_RESSOURCES } from "shared-types";

import { mimetypeExtensionDict } from "constants/mimetypeExtensionDict";

import { assertFileType } from "helpers/assertFiletype";

const getUrl = ({ mimetype, key }: { mimetype: string; key: string }) =>
  mimetype.startsWith("image/")
    ? `/imgproxy/insecure/rs:fit:$w:$h/g:no/${Buffer.from(
        `s3://${process.env.AWS_BUCKET}/${key}`
      ).toString("base64")}`
    : `/api/v1/bucket/file/${key}`;

const addSingleFile = async (
  file: Express.Multer.File,
  abortController?: AbortController
) => {
  await assertFileType(file);

  const invalidateTimestamp = getInvalidateTimeStamp();

  const key = await uploadFileToBucketAndDeleteOnDisk({
    file,
    abortController,
  });

  const url = getUrl({ mimetype: file.mimetype, key });
  const bucketFile = await BucketFile.create({
    originalFileName: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    isPersisted: false,
    key,
    invalidateAt: invalidateTimestamp,
    isDeleted: false,
    url,
  });

  producer.emit.FileUploaded(formatBucketFileResponse(bucketFile));

  return bucketFile;
};

const uploadFileToBucketAndDeleteOnDisk = async ({
  file,
  abortController,
  key,
}: {
  file: { path: string; filename: string };
  abortController?: AbortController;
  key?: string;
}): Promise<string> => {
  // Can be a path style string for better concern separation
  const fileKey = key || file.filename;

  await uploadBucketFile(file, fileKey, abortController);

  fs.unlink(file.path);

  return fileKey;
};

const getInvalidateTimeStamp = () => {
  if (!process.env.PENDING_DURATION_MINUTES)
    throw new Error("Missing required env variable : PENDING_DURATION_MINUTES");

  return Date.now() + Number(process.env.PENDING_DURATION_MINUTES) * 60 * 1000;
};

export const addBatchFiles = async (
  files: Express.Multer.File[],
  abortController?: AbortController
) => Promise.all(files.map((file) => addSingleFile(file, abortController)));

export const getBucketFile = getBucketFileStream;
export const addFile = addSingleFile;
export const formatBucketFileResponse = ({
  key,
  mimetype,
  id,
  originalFileName,
  url,
  size,
}: BucketFileDocument): FileRouteTypes["/file/"]["POST"]["response"] => ({
  key,
  type: mimetype,
  name: originalFileName,
  _id: id,
  url,
  size,
});
export const deleteFile = async (bucketFile: BucketFileDocument) => {
  await deleteBucketFile(bucketFile.key);
  await bucketFile.delete();

  producer.emit.FileDeleted(formatBucketFileResponse(bucketFile));
};

export const deleteFileByKey = async (key: string) => {
  const bucketFile = await BucketFile.findOne({ key });

  if (!bucketFile)
    throw new NotFoundError({
      message: "File not found",
      ressource: ACCESS_RESSOURCES.FILES,
    });

  await deleteFile(bucketFile);
};

export const deleteFileByEndOfUrl = async (endOfUrl: string) => {
  const bucketFile = await BucketFile.findOne({
    url: {
      $regex: new RegExp(`/${endOfUrl}$`),
    },
  });

  if (!bucketFile)
    throw new NotFoundError({
      message: "File not found",
      ressource: ACCESS_RESSOURCES.FILES,
    });

  await deleteFile(bucketFile);
};

export const persistFileByKey = async (key: string) => {
  const bucketFile = await BucketFile.findOneAndUpdate(
    { key },
    { $set: { isPersisted: true, invalidateAt: null } }
  );

  if (!bucketFile)
    throw new NotFoundError({
      message: "File not found",
      ressource: ACCESS_RESSOURCES.FILES,
    });

  producer.emit.FilePersisted(formatBucketFileResponse(bucketFile));
};

export const persistFileByEndOfUrl = async (endOfUrl: string) => {
  const bucketFile = await BucketFile.findOneAndUpdate(
    {
      url: {
        $regex: new RegExp(`/${endOfUrl}$`),
      },
    },
    { $set: { isPersisted: true, invalidateAt: null } }
  );

  if (!bucketFile)
    throw new NotFoundError({
      message: "File not found",
      ressource: ACCESS_RESSOURCES.FILES,
    });

  producer.emit.FilePersisted(formatBucketFileResponse(bucketFile));
};

export const addByUrl = async (
  url: string,
  acceptedMimeTypes: string[] = []
) => {
  const {
    data: stream,
    headers: { "content-type": mimetype, "content-length": size },
  } = await axios.get(url, {
    responseType: "stream",
  });

  const extension = mimetypeExtensionDict[mimetype];

  if (!acceptedMimeTypes.some((type) => mimetype.startsWith(type))) {
    throw new ObjectValidationError({
      message: `File not accepted`,
      fields: [
        {
          fieldName: "file",
          message: `File type ${mimetype} is not accepted. Should be one of : ${acceptedMimeTypes.join(
            ", "
          )}`,
        },
      ],
    });
  }

  const now = Date.now().toString();
  const invalidateTimestamp = getInvalidateTimeStamp();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const baseTmpPath = resolvePath(process.env.TMP_DIR_NAME!);
  const filename = [now, extension].filter(Boolean).join(".");
  const tmpPath = `${baseTmpPath}/${filename}`;
  const writer = fs.createWriteStream(tmpPath);

  stream.pipe(writer);

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const file = {
    path: tmpPath,
    filename,
    mimetype,
    size,
  };

  await assertFileType(file);

  const key = await uploadFileToBucketAndDeleteOnDisk({
    file,
  });

  const bucketUrl = getUrl({ mimetype: file.mimetype, key });
  const bucketFile = await BucketFile.create({
    originalFileName: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    isPersisted: false,
    key,
    invalidateAt: invalidateTimestamp,
    isDeleted: false,
    url: bucketUrl,
  });

  producer.emit.FileUploaded(formatBucketFileResponse(bucketFile));

  return bucketFile;
};
