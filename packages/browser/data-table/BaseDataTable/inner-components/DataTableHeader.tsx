import { clsx } from "core-utils";
import { RawInput } from "forms";
import { SortDirection } from "shared-types/SortDirection";

import { DEFAULT_DATATABLE_SORT_DIRECTION } from "../defaults";
import { useBaseDataTableContext } from "../hooks/useBaseDataTableContext";
import { DataTableHeaderProps } from "../types";
import Chevron from "../../components/Icons/Chevron";
import SearchIcon from "../../components/Icons/SearchIcon";

const DataTableHeader = ({ headerItems }: DataTableHeaderProps) => {
  const {
    currentSort,
    headerClassName,
    onSortChange,
    columns,
    keyword,
    onKeywordChange,
    showSearch,
    subHeader,
  } = useBaseDataTableContext();

  return (
    <>
      {showSearch && (
        <tr
          className={clsx(
            headerClassName,
            "bg-gray-100 text-left text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <td className="p-2" colSpan={columns.length}>
            <RawInput
              className="max-w-sm"
              name="search"
              type="text"
              placeholder="Search .."
              value={keyword ?? ""}
              onChange={({ target: { value } }) => onKeywordChange?.(value)}
              leftIcon={<SearchIcon />}
            />
          </td>
        </tr>
      )}
      {subHeader && (
        <tr
          className={clsx(
            headerClassName,
            "bg-gray-100 text-left text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <td className="p-2" colSpan={columns.length}>
            {subHeader}
          </td>
        </tr>
      )}

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
              className={clsx(
                headerItem.className,
                "hidden px-6 py-4 md:table-cell",
                {
                  "cursor-pointer": headerItem.sortable,
                }
              )}
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
              <div
                className={clsx(
                  "flex items-center justify-between",
                  headerItem.rowContainerClassName
                )}
              >
                {headerItem.label}
                {!headerItem.hideSortIcon && (
                  <Chevron
                    className={clsx("ml-3 transition-[opacity,transform]", {
                      "rotate-180": currentSortDirection === SortDirection.ASC,
                      "opacity-0": !currentSortDirection,
                    })}
                  />
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </>
  );
};

export default DataTableHeader;
