import { createContext, useContext } from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

import { ControlledDataTableProps } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<ControlledDataTableProps<any> | null>(
  null
);

export const createDataTableContext = <T,>() =>
  createContext<ControlledDataTableProps<T> | null>(null);

export const DataTableProvider = <T,>({
  children,
  ...props
}: ControlledDataTableProps<T> & ReactChildrenProps) => (
  <DataTableContext.Provider value={props}>
    {children}
  </DataTableContext.Provider>
);

export const useDataTableContext = <T,>() => {
  const context = useContext(DataTableContext);

  if (!context)
    throw new Error(
      "useDataTableContext should be called inside DataTableProvider"
    );

  return context as ControlledDataTableProps<T>;
};
