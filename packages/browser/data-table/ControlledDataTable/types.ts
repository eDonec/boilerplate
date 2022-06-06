import { IPaginatedResult } from "shared-types";

import { BaseDatatableProps } from "../BaseDataTable/types";

export type ControlledDataTableProps<T> = Omit<
  BaseDatatableProps<T>,
  "renderListFooter" | "data"
> & {
  data: IPaginatedResult<T>;
  limit?: string;
  limitOptions?: string[];
  onLimitChange?: (limit: number) => void;
  loading?: boolean;
  onPageChange?: (page: number) => void;
};
