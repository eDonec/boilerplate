import { HydratedDocument, LeanDocument } from "mongoose";

export type BucketFileType = {
  mimetype: string;
  size: number;
  path: string;
  isPersisted: boolean;
  invalidateAt?: number;
  isDeleted: boolean;
};

export type BucketFileDocument = HydratedDocument<BucketFileType>;

export type LeanBucketFileDocument = LeanDocument<BucketFileDocument>;
