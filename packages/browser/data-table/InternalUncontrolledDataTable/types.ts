import {
  ControlledDataTableProps,
  PaginatedResponse,
  SortDirection,
} from "../ControlledDataTable/types";

export type FetchFunction<T> = (args: {
  page?: number;
  limit?: number;
  sortDirection?: SortDirection;
  sortField?: string;
}) => Promise<PaginatedResponse<T>>;

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
  onFetchError?: (error: unknown) => void;
};
