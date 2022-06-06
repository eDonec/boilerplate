import { clsx, get } from "core-utils";

import { useBaseDataTableContext } from "../hooks/useBaseDataTableContext";
import { DataTableRowProps } from "../types";

const DataTableRow = <T,>({ item, index }: DataTableRowProps<T>) => {
  const { columns, rowClassName, data } = useBaseDataTableContext<T>();

  return (
    <tr
      className={clsx(
        rowClassName,
        "bg-white dark:border-gray-700 dark:bg-gray-800",
        {
          "border-b": index < data.length,
        }
      )}
    >
      {columns.map((col, keyIndex) => (
        <td
          className={clsx(col.className, "px-6 py-4")}
          key={col.selector || keyIndex}
        >
          {col.selector ? get(item, col.selector) : col.cell?.(item)}
        </td>
      ))}
    </tr>
  );
};

export default DataTableRow;
