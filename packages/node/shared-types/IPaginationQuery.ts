import { FilterQuery, PipelineStage } from "mongoose";

export type FetchPaginatedArgs = {
  page?: string;
  limit?: string;
  "sort-direction"?: string;
  "sort-field"?: string;
  keyword?: string;
};

export type IPaginationQuery<T> = FetchPaginatedArgs & {
  match?: FilterQuery<T>;
  projection?: PipelineStage.Project["$project"];
  itemTransformer?: PipelineStage.Project["$project"][string];
};
