import { FilterQuery, PipelineStage } from "mongoose";

import { SortDirection } from "./SortDirection";

export type FetchPaginatedArgs = {
  page?: string;
  limit?: string;
  "sort-direction"?: SortDirection;
  "sort-field"?: string;
  keyword?: string;
};

export type IPaginationQuery<T> = FetchPaginatedArgs & {
  match?: FilterQuery<T>;
  projection?: PipelineStage.Project["$project"];
};
