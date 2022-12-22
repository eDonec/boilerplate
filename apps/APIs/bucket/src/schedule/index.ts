/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable no-console */
import BucketFile from "models/BucketFile";
import { scheduleJob } from "node-schedule";
import {
  deleteFile,
  deleteFileByEndOfUrl,
  deleteFileByKey,
  persistFileByEndOfUrl,
  persistFileByKey,
} from "services/file";

scheduleJob("*/30 * * * *", async () => {
  (
    await BucketFile.find({
      isPersisted: { $ne: true },
      invalidateAt: { $lte: Date.now() },
    })
  ).forEach(deleteFile);
});

const syncUpdateByEndOfUrl = ({
  filesToDelete,
  filesToPersist,
}: {
  filesToDelete: string[];
  filesToPersist: string[];
}) => {
  Promise.all(filesToPersist.map(persistFileByEndOfUrl)).catch(console.error);
  Promise.all(filesToDelete.map(deleteFileByEndOfUrl)).catch(console.error);
};

const syncCreateByEndOfUrl = async ({
  filesToPersist,
}: {
  filesToPersist: string[];
}) => {
  Promise.all(filesToPersist.map(persistFileByEndOfUrl)).catch(console.error);
};

const syncDeleteByEndOfUrl = ({
  filesToDelete,
}: {
  filesToDelete: string[];
}) => {
  Promise.all(filesToDelete.map(deleteFileByEndOfUrl)).catch(console.error);
};

const syncUpdateByKey = ({
  filesToDelete,
  filesToPersist,
}: {
  filesToDelete: string[];
  filesToPersist: string[];
}) => {
  Promise.all(filesToPersist.map(persistFileByKey)).catch(console.error);
  Promise.all(filesToDelete.map(deleteFileByKey)).catch(console.error);
};

const syncCreateByKey = async ({
  filesToPersist,
}: {
  filesToPersist: string[];
}) => {
  Promise.all(filesToPersist.map(persistFileByKey)).catch(console.error);
};

const syncDeleteByKey = ({ filesToDelete }: { filesToDelete: string[] }) => {
  Promise.all(filesToDelete.map(deleteFileByKey)).catch(console.error);
};
