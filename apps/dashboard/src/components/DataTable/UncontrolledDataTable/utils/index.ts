import { SortDirection } from "components/DataTable/ControlledDataTable/types";

export const isSortDirection = (input?: unknown): input is SortDirection =>
  typeof input === "string" &&
  Object.values(SortDirection).includes(input as SortDirection);
