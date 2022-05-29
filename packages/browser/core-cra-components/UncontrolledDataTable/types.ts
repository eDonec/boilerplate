import { InternalUncontrolledDataTableProps } from "data-table/InternalUncontrolledDataTable/types";

export type UncontrolledDataTableProps<T> = Omit<
  InternalUncontrolledDataTableProps<T>,
  "searchParams" | "setSearchParams"
>;

export * from "data-table/ControlledDataTable/types";
export type { FetchFunction } from "data-table/InternalUncontrolledDataTable/types";
