import { HydratedDocument, LeanDocument, Model, PipelineStage } from "mongoose";
import {
  IPaginatedResult,
  IPaginationQuery,
  UploadedBucketFileResponse,
} from "shared-types";

export type CategoryType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: UploadedBucketFileResponse;
  artisticTitle?: string;
};

export type CategoryDocument = HydratedDocument<CategoryType>;
export type LeanCategoryDocument = LeanDocument<CategoryDocument>;
export type CategoryTypeSaticMethods = {
  findPaginated: <Item = LeanCategoryDocument>(
    this: CategoryModel,
    args: IPaginationQuery<CategoryType>,
    prependedPipelines?: PipelineStage[]
  ) => Promise<IPaginatedResult<Item>>;
};
export type CategoryModel = Model<CategoryType> & CategoryTypeSaticMethods;
