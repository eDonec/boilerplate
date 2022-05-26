import React from "react";

import { FlatListProps } from "components/FlatList";

export enum SortDirection {
  ASC = "ASC",
  DSC = "DSC",
}

export type PaginatedResponse<T> = {
  page: number;
  totalItems: number;
  hasNextPage: boolean;
  totalPages: number;
  items: T[];
};

export type DataTableColumn<T> = {
  title: string;
  selector: string;
  cell?: (item: T) => React.ReactElement;
  sortCallbackValue?: string;
  sortable?: boolean;
  className?: string;
};

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
  data: PaginatedResponse<T>;
  columns: DataTableColumn<T>[];
  onPageChange?: (page: number) => void;
  currentSort?: SelectedSort;
  onSortChange?: (args: { field: string; direction: SortDirection }) => void;
  limit?: number;
  limitOptions?: number[];
  onLimitChange?: (limit: number) => void;
  loading?: boolean;
};
