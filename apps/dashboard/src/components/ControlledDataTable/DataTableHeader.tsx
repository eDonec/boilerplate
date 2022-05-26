import { clsx } from "core-utils";

import Chevron from "components/Icons/Chevron";

import { DataTableHeaderProps, SortDirection } from "./types";

const DEFAULT_SORT_DIRECTION = SortDirection.ASC;

const DataTableHeader = ({
  headerItems,
  className,
  selectedSort,
  onSortChange,
}: DataTableHeaderProps) => (
  <tr
    className={clsx(
      className,
      "bg-gray-50 text-left text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
    )}
  >
    {headerItems.map((headerItem) => {
      const currentSortDirection =
        selectedSort?.field === headerItem.value
          ? selectedSort.direction
          : undefined;

      return (
        <th
          key={headerItem.value}
          className={clsx(headerItem.className, "cursor-pointer px-6 py-3")}
          onClick={() =>
            onSortChange?.({
              field: headerItem.value,
              direction:
                selectedSort?.field === headerItem.value
                  ? SortDirection[
                      selectedSort.direction === SortDirection.ASC
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

export default DataTableHeader;
