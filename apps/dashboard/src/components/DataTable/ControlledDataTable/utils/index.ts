import { DataTableColumn, HeaderItem } from "components/DataTable/types";

export const getDataTableHeaderItems = <T>(
  columns: DataTableColumn<T>[]
): HeaderItem[] =>
  columns.map((col) => ({
    label: col.title,
    value: col.sortCallbackValue || col.selector,
    className: col.className,
  }));
