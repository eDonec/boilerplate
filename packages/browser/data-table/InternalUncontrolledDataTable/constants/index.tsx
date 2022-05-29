import { PaginatedResponse } from "../../ControlledDataTable/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyPaginationResponse: PaginatedResponse<any> = {
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
}
