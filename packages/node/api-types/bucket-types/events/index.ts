import TCustomErrors from "shared-types/Errors";

export enum BucketEvents {
  FileUploaded = "FileUploaded",
  FilePersisted = "FilePersisted",
  FileDeleted = "FileDeleted",
  BucketError = "BucketError",
}

export type BucketEventsPayload = {
  [BucketEvents.FileUploaded]: {
    key: string;
    type: string;
    name: string;
    _id: string;
  };

  [BucketEvents.FilePersisted]: {
    placeholder: string;
  };
  [BucketEvents.FileDeleted]: {
    placeholder: string;
  };
  [BucketEvents.BucketError]: TCustomErrors;
};
