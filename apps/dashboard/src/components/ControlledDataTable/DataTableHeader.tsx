import { clsx } from "core-utils";

import Chevron from "components/Icons/Chevron";

import { useDataTableContext } from "./DataTableContext";
import { DataTableHeaderProps, SortDirection } from "./types";

const DEFAULT_SORT_DIRECTION = SortDirection.ASC;

const DataTableHeader = ({ headerItems }: DataTableHeaderProps) => {
  const { currentSort, headerClassName, onSortChange } = useDataTableContext();

  return (
    <tr
      className={clsx(
        headerClassName,
        "bg-gray-50 text-left text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      )}
    >
      {headerItems.map((headerItem) => {
        const currentSortDirection =
          currentSort?.field === headerItem.value
            ? currentSort.direction
            : undefined;

        return (
          <th
            key={headerItem.value}
            className={clsx(headerItem.className, "cursor-pointer px-6 py-3")}
            onClick={() =>
              onSortChange?.({
                field: headerItem.value,
                direction:
                  currentSort?.field === headerItem.value
                    ? SortDirection[
                        currentSort.direction === SortDirection.ASC
                          ? "DSC"
                          : "ASC"
                      ]
                    : DEFAULT_SORT_DIRECTION,
              })
            }
          >
            <div className="flex items-center justify-between ">
              {headerItem.label}
              <Chevron
                className={clsx("ml-3 transition-transform", {
                  "rotate-180": currentSortDirection === SortDirection.ASC,
                  invisible: !currentSortDirection,
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
