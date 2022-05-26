import { createContext } from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

import { ControlledDataTableProps } from "../../types";

export const DataTableContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<ControlledDataTableProps<any> | null>(null);

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
