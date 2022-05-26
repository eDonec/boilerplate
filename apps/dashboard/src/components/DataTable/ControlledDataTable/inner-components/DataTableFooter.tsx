import { clsx } from "core-utils";
import Select from "forms/Select/RawSelect";

import Chevron from "components/Icons/Chevron";
import ChevronEnd from "components/Icons/ChevronEnd";

import {
  DEFAULT_DATATABLE_LIMIT,
  DEFAULT_DATATABLE_LIMIT_OPTIONS,
} from "../defaults";
import { useDataTableContext } from "../hooks/useDataTableContext";
import { formatLimit, formatLimitOptions } from "../utils";

const DataTableFooter = () => {
  const {
    footerClassName,
    limit = DEFAULT_DATATABLE_LIMIT,
    limitOptions = DEFAULT_DATATABLE_LIMIT_OPTIONS,
    onLimitChange = () => {},
    data: { totalItems, totalPages, page },
    onPageChange,
    columns,
  } = useDataTableContext();

  return (
    <tr>
      <td colSpan={columns.length}>
        <div
          className={clsx(
            footerClassName,
            "flex items-center justify-end gap-4 bg-gray-100 px-6 py-3 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          )}
        >
          <span>Items per page</span>
          <Select
            options={formatLimitOptions(limitOptions)}
            value={formatLimit(limit)}
            onChange={(newLimit) => onLimitChange(Number(newLimit.value))}
          />
          <span>
            {`${1 + Math.max(page - 1, 0) * limit} - ${Math.min(
              limit * page,
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
