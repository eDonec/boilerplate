import React from "react";

import { IPaginatedResult } from "shared-types/IPaginatedResult";
import { FetchPaginatedArgs } from "shared-types/IPaginationQuery";

import { ControlledDataTableProps } from "../ControlledDataTable/types";

export type FetchFunction<T> = (
  args: FetchPaginatedArgs
) => Promise<IPaginatedResult<T>>;

export type UncontrolledDataTableHandle<T> = {
  useData: () => [
    data: IPaginatedResult<T>,
    setData: React.Dispatch<React.SetStateAction<IPaginatedResult<T>>>
  ];
};

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
  handle?: React.RefObject<UncontrolledDataTableHandle<T>>;
};
