import { createContext } from "react";

import ReactChildrenProps from "shared-types/ReactChildren";

import { BaseDatatableProps } from "../types";

export const BaseDataTableContext =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createContext<BaseDatatableProps<any> | null>(null);

export const BaseDataTableProvider = <T,>({
  children,
  ...props
}: BaseDatatableProps<T> & ReactChildrenProps) => (
  <BaseDataTableContext.Provider value={props}>
    {children}
  </BaseDataTableContext.Provider>
);
