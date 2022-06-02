import { IPaginatedResult } from "shared-types/IPaginatedResult";
import { SortDirection } from "shared-types/SortDirection";

import { ControlledDataTableProps } from "../ControlledDataTable/types";

export type FetchFunction<T> = (args: {
  page?: number;
  limit?: number;
  sortDirection?: SortDirection;
  sortField?: string;
}) => Promise<IPaginatedResult<T>>;

export type InternalUncontrolledDataTableProps<T> = Pick<
  ControlledDataTableProps<T>,
  | "className"
  | "rowClassName"
  | "footerClassName"
  | "contentContainerClassName"
  | "headerClassName"
  | "columns"
  | "keyExtractor"
  | "limitOptions"
> & {
  fetchFunction: FetchFunction<T>;
  searchParams: URLSearchParams;
  setSearchParams: (nextSearchParams: URLSearchParams) => void;
  initialValue?: ControlledDataTableProps<T>["data"];
  onFetchError?: (error: unknown) => void;
};
