import { clsx } from "core-utils";
import Select from "forms/Select/RawSelect";

import Chevron from "components/Icons/Chevron";
import ChevronEnd from "components/Icons/ChevronEnd";

import { useDataTableContext } from "./DataTableContext";

const DataTableFooter = () => {
  const {
    footerClassName,
    limit = { label: "10", value: "10" },
    limitOptions = [{ label: "10", value: "10" }],
    onLimitChange = () => {},
    data: { totalItems, totalPages, page },
    onPageChange,
  } = useDataTableContext();

  return (
    <tr>
      <td colSpan={100}>
        <div
          className={clsx(
            footerClassName,
            "flex items-center justify-end gap-4 bg-gray-50 px-6 py-3 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <span>Items per page</span>
          <Select
            options={limitOptions}
            value={limit}
            onChange={onLimitChange}
          />
          <span>
            {`${1 + Math.max(page - 1, 0) * Number(limit.value)} - ${Math.min(
              Number(limit.value) * page,
              totalItems
            )} of ${totalItems}`}
          </span>
          <div className="flex gap-2">
            <button
              className="disabled:opacity-50"
              onClick={() => onPageChange?.(1)}
              disabled={page === 1}
            >
              <ChevronEnd className="rotate-90" />
            </button>
            <button
              className="disabled:opacity-50"
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 1}
            >
              <Chevron className="rotate-90" />
            </button>
            <button
              className="disabled:opacity-50"
              onClick={() => onPageChange?.(page + 1)}
              disabled={page === totalPages}
            >
              <Chevron className="-rotate-90" />
            </button>
            <button
              className="disabled:opacity-50"
              onClick={() => onPageChange?.(totalPages)}
              disabled={page === totalPages}
            >
              <ChevronEnd className="-rotate-90" />
            </button>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DataTableFooter;
