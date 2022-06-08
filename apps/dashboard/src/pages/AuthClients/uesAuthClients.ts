import { useRef, useState } from "react";

import Api from "api";
import { LeanAuthDocument } from "auth-types/models/Auth";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";
import { useAlertDialog } from "core-ui/AlertDialog";

import { UncontrolledDataTableHandle } from "data-table/InternalUncontrolledDataTable/types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";

import { CLIENT_ACTION_OPTIONS } from "./ClientActions";
import { useClientActions } from "./ClientActions/useClientActions";
import { getDataColumns } from "./getDataColumns";

export const fetchFunction: FetchFunction<LeanAuthDocument> = (args) =>
  Api.authSDK.getAuthenticatedClients({ query: args });

let selectedId = "";

export const useAuthClients = () => {
  useInitRoute({
    description: "Authenticated Clients",
    title: "List of authenticated clients",
  });
  const handleClientAction =
    (_id: string) => (action: CLIENT_ACTION_OPTIONS) => {
      selectedId = _id;
      if (action === CLIENT_ACTION_OPTIONS.BAN_CLIENT) {
        handeBanClient(_id);
      }
      if (
        action === CLIENT_ACTION_OPTIONS.LIFT_BAN ||
        action === CLIENT_ACTION_OPTIONS.LIFT_SUSPENTION
      ) {
        handeLiftBanAndSuspension(_id);
      }
      if (action === CLIENT_ACTION_OPTIONS.SUSPEND_CLIENT) {
        setSuspensionModalOpen(true);
      }
    };
  const dataTableRef =
    useRef<UncontrolledDataTableHandle<LeanAuthDocument>>(null);

  const { banClient, liftBanAndSuspension, suspendClient, isLoading } =
    useClientActions(dataTableRef);
  const [banClientDialogueProps, handeBanClient] = useAlertDialog(banClient);

  const [isSuspensionModalOpen, setSuspensionModalOpen] = useState(false);
  const [liftBanAndSuspensionDialogueProps, handeLiftBanAndSuspension] =
    useAlertDialog(liftBanAndSuspension);

  const dataColumns = getDataColumns(handleClientAction, isLoading);

  return {
    dataColumns,
    dataTableRef,
    banClientDialogueProps,
    liftBanAndSuspensionDialogueProps,
    isSuspensionModalOpen,
    setSuspensionModalOpen,
    suspendClient: ({
      reason,
      suspensionLiftTime,
    }: {
      reason: string;
      suspensionLiftTime: Date;
    }) => {
      suspendClient(selectedId, reason, suspensionLiftTime);
      setSuspensionModalOpen(false);
    },
  };
};
