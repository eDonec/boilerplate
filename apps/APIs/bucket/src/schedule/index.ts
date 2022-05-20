import BucketFile from "models/BucketFile";
import { scheduleJob } from "node-schedule";
import { deleteFile } from "services/file";

scheduleJob("*/30 * * * *", async () => {
  (
    await BucketFile.find({
      isPersisted: { $ne: true },
      invalidateAt: { $lte: Date.now() },
    })
  ).forEach(deleteFile);
});
