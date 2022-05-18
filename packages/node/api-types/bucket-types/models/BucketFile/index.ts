import { HydratedDocument, LeanDocument } from "mongoose";

export type BucketFileType = {
  mimetype: string;
  size: number;
  key: string;
  isPersisted: boolean;
  invalidateAt?: number;
  originalFileName: string;
};

export type BucketFileDocument = HydratedDocument<BucketFileType>;

export type LeanBucketFileDocument = LeanDocument<BucketFileDocument>;
