import React from "react";

import {
  IPaginatedResult,
  KeyOfNestedObjectWithoutArray,
  RequireAtLeastOne,
  SortDirection,
} from "shared-types";

import { FlatListProps } from "../components/FlatList";

export type DataTableColumn<T> = RequireAtLeastOne<
  {
    title: string;
    selector: KeyOfNestedObjectWithoutArray<T>;
    cell?: (item: T) => React.ReactElement;
    sortCallbackValue?: string;
    sortable?: boolean;
    className?: string;
  },
  "cell" | "selector"
>;

export type HeaderItem = {
  label: string;
  value: string;
  className?: string;
  sortable?: boolean;
};
export type SelectedSort = {
  field: string;
  direction: SortDirection;
};

// Component props

export type DataTableHeaderProps = {
  headerItems: HeaderItem[];
};

export type DataTableRowProps<T> = {
  item: T;
  index: number;
};

export type ControlledDataTableProps<T> = Pick<
  FlatListProps<T>,
  | "className"
  | "contentContainerClassName"
  | "keyExtractor"
  | "renderListSeparator"
> & {
  rowClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  data: IPaginatedResult<T>;
  columns: DataTableColumn<T>[];
  onPageChange?: (page: number) => void;
  currentSort?: SelectedSort;
  onSortChange?: (args: { field: string; direction: SortDirection }) => void;
  limit?: string;
  limitOptions?: string[];
  onLimitChange?: (limit: number) => void;
  loading?: boolean;
};
