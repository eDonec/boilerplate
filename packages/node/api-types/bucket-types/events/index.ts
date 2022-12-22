import TCustomErrors from "shared-types/Errors";
import { UploadedBucketFileResponse } from "shared-types/UploadedBucketFileResponse";

export enum BucketEvents {
  FileUploaded = "FileUploaded",
  FilePersisted = "FilePersisted",
  FileDeleted = "FileDeleted",
  BucketError = "BucketError",
}

export type BucketEventsPayload = {
  [BucketEvents.FileUploaded]: UploadedBucketFileResponse;

  [BucketEvents.FilePersisted]: UploadedBucketFileResponse;
  [BucketEvents.FileDeleted]: {
    placeholder: string;
  };
  [BucketEvents.BucketError]: TCustomErrors;
};
