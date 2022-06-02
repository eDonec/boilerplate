import { FilterQuery, PipelineStage } from "mongoose";

import { SortDirection } from "./SortDirection";

export type IPaginationQuery<T> = {
  page?: string;
  limit?: string;
  sortDirection?: SortDirection;
  sortField?: string;
  match?: FilterQuery<T>;
  projection?: PipelineStage.Project["$project"];
};
