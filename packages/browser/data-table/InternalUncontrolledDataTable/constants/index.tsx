import { IPaginatedResult } from "shared-types/IPaginatedResult";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyPaginationResponse: IPaginatedResult<any> = {
  items: [],
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  page: 1,
};

export enum UncontrolledDataTableURLParams {
  PAGE = "page",
  LIMIT = "limit",
  SORT_DIRECTION = "sort-direction",
  SORT_FIELD = "sort-field",
  KEYWORD = "keyword",
}
export const FIRST_PAGE = "1";
