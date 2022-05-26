import { PaginatedResponse } from "components/DataTable/ControlledDataTable/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const emptyPaginationResponse: PaginatedResponse<any> = {
  items: [],
  totalItems: 0,
  totalPages: 0,
  hasNextPage: false,
  page: 1,
};
