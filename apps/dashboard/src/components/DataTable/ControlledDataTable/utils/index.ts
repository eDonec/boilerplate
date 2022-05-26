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
