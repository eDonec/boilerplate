import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

import {
  FetchFunction,
  UncontrolledDataTableHandle,
} from "data-table/InternalUncontrolledDataTable/types";

import { accessPageColumns } from "./accessPageColumns";

const fetchFunction: FetchFunction<
  Omit<LeanRoleDocument, "access"> & { isDeletable: boolean }
> = (args) => Api.authSDK.getRoles({ query: args });

export const useAccessPage = () => {
  const [t] = useTranslation();
  const [currentlyDeletingRole, setCurrentlyDeletingRole] = useState<
    null | string
  >(null);

  const dataTableRef =
    useRef<
      UncontrolledDataTableHandle<
        Omit<LeanRoleDocument, "access"> & { isDeletable: boolean }
      >
    >(null);

  const deleteRole = async (id: string) => {
    try {
      setCurrentlyDeletingRole(id);
      await Api.authSDK.deleteRole({ params: { id } });
      toast.success(t("role.roleDeletedSuccess"));
      await dataTableRef.current?.refresh();
    } catch (error) {
      if (
        isApiError<{ message: string }>(error) &&
        error.response?.data.message
      )
        toast.error(error.response.data.message);
    } finally {
      setCurrentlyDeletingRole(null);
    }
  };
  const [deleteModalProps, handleDelete] = useAlertDialog(deleteRole);

  return {
    t,
    deleteModalProps,
    dataTableRef,
    fetchFunction,
    columns: accessPageColumns({
      onDeleteRole: handleDelete,
      currentlyDeletingRole,
      t,
    }),
  };
};
