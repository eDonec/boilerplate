import { useMemo } from "react";

import { getDataTableHeaderItems } from "../utils";
import { DataTableColumn } from "../../types";

export const useDataTable = <T>(columns: DataTableColumn<T>[]) => {
  const headerItems = useMemo(
    () => getDataTableHeaderItems(columns),
    [columns]
  );

  return {
    headerItems,
  };
};
