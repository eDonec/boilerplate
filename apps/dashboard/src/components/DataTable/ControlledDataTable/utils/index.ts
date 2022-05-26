import { ISelectOption } from "forms/Select";

import {
  DataTableColumn,
  HeaderItem,
} from "components/DataTable/ControlledDataTable/types";

export const getDataTableHeaderItems = <T>(
  columns: DataTableColumn<T>[]
): HeaderItem[] =>
  columns.map((col) => ({
    label: col.title,
    value: col.sortCallbackValue || col.selector,
    className: col.className,
    sortable: typeof col.sortable === "boolean" ? col.sortable : true,
  }));

export const formatLimit = (limit: number): ISelectOption<string> => ({
  label: `${limit}`,
  value: `${limit}`,
});

export const formatLimitOptions = (
  limitOptions: number[]
): ISelectOption<string>[] =>
  limitOptions.sort((a, b) => a - b).map(formatLimit);
