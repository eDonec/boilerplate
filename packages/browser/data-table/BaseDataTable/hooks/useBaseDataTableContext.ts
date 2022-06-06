import { useContext } from "react";

import { BaseDataTableContext } from "../context/BaseDataTableContext";
import { BaseDatatableProps } from "../types";

export const useBaseDataTableContext = <T>() => {
  const context = useContext(BaseDataTableContext);

  if (!context)
    throw new Error(
      "useDataTableContext should be called inside DataTableProvider"
    );

  return context as BaseDatatableProps<T>;
};
