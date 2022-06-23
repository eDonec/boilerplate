import getNumberFromString from "core-utils/getNumberFromString";
import { SortDirection } from "shared-types/SortDirection";

import { UncontrolledDataTableURLParams } from "../constants";
import { DEFAULT_DATATABLE_LIMIT } from "../../ControlledDataTable/defaults";

export const isSortDirection = (input?: unknown): input is SortDirection =>
  typeof input === "string" &&
  Object.values(SortDirection).includes(input as SortDirection);

export const extractQueryParams = (searchParams: URLSearchParams) => ({
  page: getNumberFromString(
    searchParams.get(UncontrolledDataTableURLParams.PAGE)
  ).toString(),
  limit: (searchParams.get(UncontrolledDataTableURLParams.LIMIT) == null ||
  Number.isNaN(Number(searchParams.get(UncontrolledDataTableURLParams.LIMIT)))
    ? DEFAULT_DATATABLE_LIMIT
    : getNumberFromString(
        searchParams.get(UncontrolledDataTableURLParams.LIMIT)
      )
  ).toString(),
  sortField: searchParams.get(UncontrolledDataTableURLParams.SORT_FIELD),
  sortDirection: searchParams.get(
    UncontrolledDataTableURLParams.SORT_DIRECTION
  ),
  keyword:
    searchParams.get(UncontrolledDataTableURLParams.KEYWORD) ?? undefined,
});
