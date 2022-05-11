import { BucketFileDocument } from "bucket-types/models/Files";
import { UploadRouteTypes } from "bucket-types/routes/upload";
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

export const addFiles = async (
  file: Express.Multer.File
): Promise<UploadRouteTypes["/upload/"]["POST"]["response"]> => {
  await assertFileType(file);

  const invalidateTimestamp = new Date(
    new Date().setMinutes(new Date().getMinutes() + PENDING_DURATION_MINUTES)
  ).getTime();

  const newUrl = await uploadFiletoAWSBucket({
    url: file.path,
    filename: file.filename,
  });

  await BucketFile.create({
    isPersisted: false,
    mimetype: file.mimetype,
    path: newUrl,
    size: file.size,
    invalidateAt: invalidateTimestamp,
    isDeleted: false,
  });

  return {
    url: newUrl,
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

const uploadFiletoAWSBucket = async ({
  url,
  filename,
}: {
  url: string;
  filename: string;
}): Promise<string> => {
  //! temporary implementation
  const newUrl = path.join(TEMP_BUCKET_BASE_PATH, filename);

  await fs.copyFile(url, newUrl);
  await fs.unlink(url);

  return newUrl;
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
