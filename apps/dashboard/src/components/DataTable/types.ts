import React from "react";

import { ISelectOption } from "forms/Select";

import { FlatListProps } from "components/FlatList";

export enum SortDirection {
  ASC = 1,
  DSC = -1,
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
  limit?: ISelectOption<string>;
  limitOptions?: ISelectOption<string>[];
  onLimitChange?: (limit: ISelectOption<string>) => void;
};
