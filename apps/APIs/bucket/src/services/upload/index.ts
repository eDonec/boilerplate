import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { BucketFileDocument } from "bucket-types/models/BucketFile";
import { UploadRouteTypes } from "bucket-types/routes/upload";
import { Request, Response } from "express";
import fs from "fs-extra";
import { resolvePath } from "init";
import BucketFile from "models/BucketFile";
import { scheduleJob } from "node-schedule";
import path from "path";

import { assertFileType } from "helpers/assertFiletype";

const PENDING_DURATION_MINUTES = 30;
const TEMP_BUCKET_BASE_PATH = path.join(__dirname, "TMP_AWS_BUCKET");

fs.mkdirSync(TEMP_BUCKET_BASE_PATH, { recursive: true });

process.on("SIGINT", () => {
  fs.removeSync(TEMP_BUCKET_BASE_PATH);
  fs.removeSync(resolvePath("public"));
  process.exit();
});

const s3Client = new S3Client({
  region: "eu-west-3",
});

console.log({
  access: process.env.AWS_ACCESS_KEY_ID,
  secret: process.env.AWS_SECRET_ACCESS_KEY,
});

export const addFiles = async (
  file: Express.Multer.File,
  req: Request
): Promise<UploadRouteTypes["/upload/"]["POST"]["response"]> => {
  await assertFileType(file);

  const invalidateTimestamp = new Date(
    new Date().setMinutes(new Date().getMinutes() + PENDING_DURATION_MINUTES)
  ).getTime();

  const newUrl = await uploadFiletoAWSBucket(file);

  const bucketFile = await BucketFile.create({
    isPersisted: false,
    mimetype: file.mimetype,
    path: newUrl,
    size: file.size,
    invalidateAt: invalidateTimestamp,
    isDeleted: false,
  });

  req.on("aborted", () => {
    deleteFile(bucketFile);
  });

  return {
    url: newUrl,
    type: file.mimetype,
    name: file.filename,
  };
};

// const persistFile = async (url: string) => {
//   await BucketFile.findOneAndUpdate(
//     { path: url },
//     { $set: { isPersisted: true, invalidateAt: null } }
//   );
// };

const deleteFile = async (bucketFile: BucketFileDocument) => {
  await deleteFileFromAWSBucket(bucketFile.path);
  bucketFile.isDeleted = true;
  await bucketFile.save();
};

const uploadFiletoAWSBucket = async (
  file: Express.Multer.File
): Promise<string> => {
  //! temporary implementation

  await s3Client.send(
    new PutObjectCommand({
      Bucket: "edonec-boilerplate-files",
      Key: file.filename,
      Body: fs.createReadStream(file.path),
    })
  );

  return path.join("images", file.filename);
};

export const getFileFromBucket = async (key: string, res: Response) => {
  const data = await s3Client.send(
    new GetObjectCommand({
      Bucket: "edonec-boilerplate-files",
      Key: key,
    })
  );

  console.log(data);
};

const deleteFileFromAWSBucket = async (url: string): Promise<void> => {
  try {
    //! temporary implementation
    await fs.unlink(url);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

scheduleJob("*/30 * * * *", async () => {
  (
    await BucketFile.find({
      isDeleted: { $ne: true },
      isPersisted: { $ne: true },
      invalidateAt: { $lte: Date.now() },
    })
  ).forEach(deleteFile);
});
