import { useMemo } from "react";

import { DataTableColumn } from "../types";
import { getDataTableHeaderItems } from "../utils";

export const useDataTable = <T>(columns: DataTableColumn<T>[]) => {
  const headerItems = useMemo(
    () => getDataTableHeaderItems(columns),
    [columns]
  );

  return {
    headerItems,
  };
};
