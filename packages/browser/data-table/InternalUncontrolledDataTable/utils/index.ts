import { UncontrolledDataTableURLParams } from "../constants";
import { DEFAULT_DATATABLE_LIMIT } from "../../ControlledDataTable/defaults";
import { SortDirection } from "../../ControlledDataTable/types";

export const isSortDirection = (input?: unknown): input is SortDirection =>
  typeof input === "string" &&
  Object.values(SortDirection).includes(input as SortDirection);

export const extractQueryParams = (searchParams: URLSearchParams) => ({
  page: Math.max(
    Number(searchParams.get(UncontrolledDataTableURLParams.PAGE)),
    1
  ),
  limit: Number(searchParams.get(UncontrolledDataTableURLParams.LIMIT))
    ? Math.max(
        Number(searchParams.get(UncontrolledDataTableURLParams.LIMIT)),
        1
      )
    : DEFAULT_DATATABLE_LIMIT,
  sortField: searchParams.get(UncontrolledDataTableURLParams.SORT_FIELD),
  sortDirection: searchParams.get(
    UncontrolledDataTableURLParams.SORT_DIRECTION
  ),
});
