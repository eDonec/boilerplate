import { useContext } from "react";

import { DataTableContext } from "../context/DataTableContext";
import { ControlledDataTableProps } from "../types";

export const useDataTableContext = <T>() => {
  const context = useContext(DataTableContext);

  if (!context)
    throw new Error(
      "useDataTableContext should be called inside DataTableProvider"
    );

  return context as ControlledDataTableProps<T>;
};
