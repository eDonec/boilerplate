import { AbortController } from "@aws-sdk/abort-controller";
import { BucketFileDocument } from "bucket-types/models/BucketFile";
import { FileRouteTypes } from "bucket-types/routes/file";
import producer from "events/producer";
import fs from "fs-extra";
import BucketFile from "models/BucketFile";
import {
  deleteBucketFile,
  getBucketFileStream,
  uploadBucketFile,
} from "s3Client";

import { assertFileType } from "helpers/assertFiletype";

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

  const url = file.mimetype.startsWith("image/")
    ? `/imgproxy/insecure/rs:fit:$w:$h/g:no/${Buffer.from(
        `s3://${process.env.AWS_BUCKET}/${key}`
      ).toString("base64")}`
    : `/api/v1/bucket/file/${key}`;

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
  file: Express.Multer.File;
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
}: BucketFileDocument): FileRouteTypes["/file/"]["POST"]["response"] => ({
  key,
  type: mimetype,
  name: originalFileName,
  _id: id,
  url,
});
export const deleteFile = async (bucketFile: BucketFileDocument) => {
  await deleteBucketFile(bucketFile.key);
  await bucketFile.delete();
};

// const persistFile = async (url: string) => {
//   await BucketFile.findOneAndUpdate(
//     { path: url },
//     { $set: { isPersisted: true, invalidateAt: null } }
//   );
// };

// ! Instant Delete
// (async () => {
//   (
//     await BucketFile.find({
//       isPersisted: { $ne: true },
//     })
//   ).forEach(deleteFile);
// })();
