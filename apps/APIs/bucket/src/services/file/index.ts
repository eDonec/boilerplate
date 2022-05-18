import { AbortController } from "@aws-sdk/abort-controller";
import { BucketFileDocument } from "bucket-types/models/BucketFile";
import { FileRouteTypes } from "bucket-types/routes/file";
import { Request, Response } from "express";
import fs from "fs-extra";
import BucketFile from "models/BucketFile";
import { scheduleJob } from "node-schedule";
import {
  deleteBucketFile,
  getBucketFileStream,
  uploadBucketFile,
} from "s3Client";

import { assertFileType } from "helpers/assertFiletype";

if (!process.env.PENDING_DURATION_MINUTES)
  throw new Error("Missing required env variable : PENDING_DURATION_MINUTES");

export const addFile = async (
  file: Express.Multer.File,
  req: Request
): Promise<FileRouteTypes["/file/"]["POST"]["response"]> => {
  await assertFileType(file);

  const invalidateTimestamp = new Date(
    new Date().setMinutes(
      new Date().getMinutes() + Number(process.env.PENDING_DURATION_MINUTES)
    )
  ).getTime();

  const abortController = new AbortController();

  const key = await uploadFiletoAWSBucket(file, abortController);
  const bucketFile = await BucketFile.create({
    isPersisted: false,
    mimetype: file.mimetype,
    key,
    size: file.size,
    invalidateAt: invalidateTimestamp,
    isDeleted: false,
  });

  req.on("aborted", () => {
    abortController.abort();
    deleteFile(bucketFile);
    if (fs.pathExistsSync(file.path)) fs.unlinkSync(file.path);
  });

  return {
    key: file.filename,
    type: file.mimetype,
    name: file.filename,
  };
};

export const addBatchFiles = async (
  files: Express.Multer.File[],
  req: Request
) => Promise.all(files.map((file) => addFile(file, req)));

const deleteFile = async (bucketFile: BucketFileDocument) => {
  await deleteBucketFile(bucketFile.key);
  await bucketFile.delete();
};

const uploadFiletoAWSBucket = async (
  file: Express.Multer.File,
  abortController?: AbortController
): Promise<string> => {
  // Can be a path style string for better concern separation
  const fileKey = file.filename;

  await uploadBucketFile(file, fileKey, abortController);

  fs.unlink(file.path);

  return fileKey;
};

export const getBucketFile = async (key: string, res: Response) => {
  const abortController = new AbortController();

  res.req.on("aborted", () => {
    abortController.abort();
  });

  const stream = await getBucketFileStream(key, abortController);

  stream.pipe(res);
};

// const persistFile = async (url: string) => {
//   await BucketFile.findOneAndUpdate(
//     { path: url },
//     { $set: { isPersisted: true, invalidateAt: null } }
//   );
// };

scheduleJob("*/30 * * * *", async () => {
  (
    await BucketFile.find({
      isPersisted: { $ne: true },
      invalidateAt: { $lte: Date.now() },
    })
  ).forEach(deleteFile);
});

// ! Instant Delete
// (async () => {
//   (
//     await BucketFile.find({
//       isPersisted: { $ne: true },
//     })
//   ).forEach(deleteFile);
// })();
