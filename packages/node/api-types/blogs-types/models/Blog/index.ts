import { HydratedDocument, LeanDocument, Model, PipelineStage } from "mongoose";
import {
  IPaginatedResult,
  IPaginationQuery,
  TextDirection,
  UploadedBucketFileResponse,
} from "shared-types";

export type BlogType = {
  _id: string;
  banner: UploadedBucketFileResponse;
  title: string;
  description: string;
  metaDescription: string;
  mainCategory: string;
  secondaryCategories: string[];
  content: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  textDirection?: TextDirection;
  upvotes: string[];
  downvotes: string[];
  claps: number;
};

export type BlogTypeSaticMethods = {
  findPaginated: <Item = LeanBlogDocument>(
    this: BlogModel,
    args: IPaginationQuery<BlogType>,
    prependedPipelines?: PipelineStage[]
  ) => Promise<IPaginatedResult<Item>>;
};
export type BlogModel = Model<BlogType> & BlogTypeSaticMethods;
export type BlogDocument = HydratedDocument<BlogType>;
export type LeanBlogDocument = LeanDocument<BlogDocument>;
