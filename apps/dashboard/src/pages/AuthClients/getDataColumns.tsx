import { LeanAuthDocument } from "auth-types/models/Auth";
import { clsx } from "core-utils";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import ClientActions, { CLIENT_ACTION_OPTIONS } from "./ClientActions";

export const getDataColumns = (
  clientActions: (id: string) => (action: CLIENT_ACTION_OPTIONS) => void,
  isLoading: boolean | string
): DataTableColumn<LeanAuthDocument>[] => [
  { selector: "_id", title: "ID" },
  {
    selector: "email",
    title: "Email",
  },
  {
    title: "User Name",
    cell: ({ userName }) => (
      <span className={clsx(userName ?? "text-red-400")}>
        {userName || "N/A"}
      </span>
    ),
  },
  {
    selector: "role.name",
    title: "Role",
  },
  {
    selector: "authType",
    title: "User or App",
  },
  {
    title: "Banned",
    cell: (item) =>
      item.isBanned ? (
        <>
          <span className="text-red-400">Banned indefinitely</span>
        </>
      ) : (
        <span className="text-success-400 text-sm">No</span>
      ),
    sortCallbackValue: "isBanned",
  },
  {
    title: "Suspended",
    cell: (item) =>
      item.isSuspended ? (
        <>
          <span className="text-red-400">{"Suspended for "}</span>
          {item.isSuspended && (
            <span className="text-red-400">{`"${item.suspensionReason}" ${
              item.suspensionLiftTime &&
              `until ${new Date(item.suspensionLiftTime).toLocaleString()}`
            }`}</span>
          )}
        </>
      ) : (
        <span className="text-success-400 text-sm">No</span>
      ),
    sortCallbackValue: "isSuspended",
  },
  {
    title: "Actions",
    cell: ({ _id, isSuspended, isBanned }) => (
      <ClientActions
        handelClientAction={clientActions(_id)}
        isBanned={isBanned}
        isSuspended={isSuspended}
        isLoading={_id === isLoading}
      />
    ),
  },
];
