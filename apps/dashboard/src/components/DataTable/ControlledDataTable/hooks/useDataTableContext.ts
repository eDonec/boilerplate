import { useContext } from "react";

import { ControlledDataTableProps } from "components/DataTable/types";

import { DataTableContext } from "../context/DataTableContext";

export const useDataTableContext = <T>() => {
  const context = useContext(DataTableContext);

  if (!context)
    throw new Error(
      "useDataTableContext should be called inside DataTableProvider"
    );

  return context as ControlledDataTableProps<T>;
};
