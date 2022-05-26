import { clsx, get } from "core-utils";

import { DataTableRowProps } from "./types";

const DataTableRow = <T,>({
  item,
  columns,
  className,
}: DataTableRowProps<T>) => (
  <tr
    className={clsx(
      className,
      "bg-white dark:border-gray-700 dark:bg-gray-800"
    )}
  >
    {columns.map((col) => (
      <td className={clsx(col.className, "px-6 py-4")} key={col.selector}>
        {col.cell ? col.cell(item) : get(item, col.selector)}
      </td>
    ))}
  </tr>
);

export default DataTableRow;
