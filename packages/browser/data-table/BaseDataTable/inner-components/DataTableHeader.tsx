import { clsx } from "core-utils";
import { SortDirection } from "shared-types/SortDirection";

import { DEFAULT_DATATABLE_SORT_DIRECTION } from "../defaults";
import { useBaseDataTableContext } from "../hooks/useBaseDataTableContext";
import { DataTableHeaderProps } from "../types";
import Chevron from "../../components/Icons/Chevron";

const DataTableHeader = ({ headerItems }: DataTableHeaderProps) => {
  const { currentSort, headerClassName, onSortChange } =
    useBaseDataTableContext();

  return (
    <tr
      className={clsx(
        headerClassName,
        "bg-gray-100 text-left text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      )}
    >
      {headerItems.map((headerItem, keyIndex) => {
        const currentSortDirection =
          headerItem.sortable && currentSort?.field === headerItem.value
            ? currentSort.direction
            : undefined;

        return (
          <th
            key={headerItem.value || keyIndex}
            className={clsx(headerItem.className, "cursor-pointer px-6 py-4")}
            onClick={() =>
              headerItem.sortable &&
              onSortChange?.({
                field: headerItem.value,
                direction:
                  currentSort?.field === headerItem.value
                    ? SortDirection[
                        currentSort.direction === SortDirection.ASC
                          ? "DSC"
                          : "ASC"
                      ]
                    : DEFAULT_DATATABLE_SORT_DIRECTION,
              })
            }
          >
            <div className="flex items-center justify-between ">
              {headerItem.label}
              <Chevron
                className={clsx("ml-3 transition-[opacity,transform]", {
                  "rotate-180": currentSortDirection === SortDirection.ASC,
                  "opacity-0": !currentSortDirection,
                })}
              />
            </div>
          </th>
        );
      })}
    </tr>
  );
};

export default DataTableHeader;