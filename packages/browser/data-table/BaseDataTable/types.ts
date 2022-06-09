import React from "react";

import {
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
    hideSortIcon?: boolean;
    headerRowContainerClassName?: string;
  },
  "cell" | "selector"
>;

export type HeaderItem = {
  label: string;
  value: string;
  className?: string;
  sortable?: boolean;
  hideSortIcon?: boolean;
  rowContainerClassName?: string;
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

export type BaseDatatableProps<T> = Pick<
  FlatListProps<T>,
  | "className"
  | "contentContainerClassName"
  | "keyExtractor"
  | "renderListSeparator"
  | "renderListFooter"
> & {
  rowClassName?: string;
  headerClassName?: string;
  footerClassName?: string;
  data: T[];
  columns: DataTableColumn<T>[];
  currentSort?: SelectedSort;
  onSortChange?: (args: { field: string; direction: SortDirection }) => void;
  conditionalRowClassName?: (args: {
    item: T;
    index: number;
  }) => string | undefined;
};
