/* eslint-disable max-lines */
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useFirstMount } from "core-hooks";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import { accessMatcher } from "containers/AuthWrappers/AccessProtectedWrapper/useAccessProtectedWrapper";

import { useAppSelector } from "hooks/reduxHooks";

type RessourceItem = {
  title: string;
  ressource: ACCESS_RESSOURCES;
};

const privilegesTitleDict: Record<PRIVILEGE, string> = {
  [PRIVILEGE.READ_SELF]: "Read Self",
  [PRIVILEGE.WRITE_SELF]: "Write Self",
  [PRIVILEGE.DELETE_SELF]: "Delete Self",
  [PRIVILEGE.READ]: "Read",
  [PRIVILEGE.WRITE]: "Write",
  [PRIVILEGE.DELETE]: "Delete",
  [PRIVILEGE.GRANT]: "Grant",
  [PRIVILEGE.REVOKE]: "Revoke",
};

const ressourcesTitleDict: Record<ACCESS_RESSOURCES, string> = {
  [ACCESS_RESSOURCES["*"]]: "*",
  [ACCESS_RESSOURCES.USER]: "Users",
  [ACCESS_RESSOURCES.ROLE]: "Roles",
  [ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS]: "Authenticated Clients",
  [ACCESS_RESSOURCES.PUBLIC]: "Public",
  [ACCESS_RESSOURCES.BAN_CLIENTS]: "Ban Clients",
  [ACCESS_RESSOURCES.LIFT_BAN_AND_SUSPENSION]: "Lift Ban and Suspension",
  [ACCESS_RESSOURCES.SUSPEND_CLIENTS]: "Suspend Clients",
};

const isVisiblePrevilege = (input: unknown): input is PRIVILEGE =>
  typeof input === "number" &&
  Object.values(PRIVILEGE).includes(input as PRIVILEGE) &&
  input > PRIVILEGE.DELETE_SELF;

const ressources: RessourceItem[] = Object.values(ACCESS_RESSOURCES)
  .filter((ressource) => ressource !== ACCESS_RESSOURCES["*"])
  .map((ressource) => ({
    title: ressourcesTitleDict[ressource],
    ressource,
  }));

const isRessourceCheckboxChecked = ({
  role,
  ressource,
  privilege,
}: {
  role: LeanRoleDocument | null;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
}) =>
  !!role?.access.find(
    (el) => el.ressource === ressource && el.privileges >= privilege
  );

const isRessourceCheckboxDisabled = ({
  baseRole,
  ressource,
  privilege,
  ressourceAccessDict,
}: {
  baseRole: LeanRoleDocument | null;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
  ressourceAccessDict: Record<
    ACCESS_RESSOURCES,
    { grant: boolean; revoke: boolean }
  >;
}) => {
  if (!ressourceAccessDict[ressource].grant) return true;
  if (ressourceAccessDict[ressource].revoke) return false;
  const isInBaseRole = !baseRole?.access.find(
    (el) => el.ressource === ressource && el.privileges < privilege
  );

  return isInBaseRole || privilege > PRIVILEGE.GRANT;
};

export const useRoleDetails = () => {
  const [role, setRole] = useState<LeanRoleDocument | null>(null);
  const [loading, setLoading] = useState(false);

  const isFirstMount = useFirstMount();
  const { id } = useParams<{ id: string }>();
  const currentUserAccess = useAppSelector((state) => state.auth.access);

  const baseRole = useRef<LeanRoleDocument | null>(null);

  if (!baseRole.current && role) baseRole.current = role;

  const ressourceAccessDict = Object.values(ACCESS_RESSOURCES).reduce<
    Record<ACCESS_RESSOURCES, { grant: boolean; revoke: boolean }>
  >((acc, value) => {
    acc[value] = {
      grant: accessMatcher(currentUserAccess, value, PRIVILEGE.GRANT),
      revoke: accessMatcher(currentUserAccess, value, PRIVILEGE.REVOKE),
    };

    return acc;
  }, {} as Record<ACCESS_RESSOURCES, { grant: boolean; revoke: boolean }>);

  if (isFirstMount && id) {
    Api.authSDK.getRoleById({ params: { id } }).then(setRole);
  }

  const columns: DataTableColumn<RessourceItem>[] = [
    {
      title: "Ressource",
      selector: "title",
    },
    ...Object.values(PRIVILEGE)
      .filter(isVisiblePrevilege)
      .map(
        (privilege): DataTableColumn<RessourceItem> => ({
          title: privilegesTitleDict[privilege],
          className: "text-center",
          headerRowContainerClassName: "!justify-center",
          hideSortIcon: true,
          sortable: false,
          cell: ({ ressource }) => (
            <input
              disabled={isRessourceCheckboxDisabled({
                baseRole: baseRole.current,
                ressource,
                privilege,
                ressourceAccessDict,
              })}
              type="checkbox"
              checked={isRessourceCheckboxChecked({
                role,
                ressource,
                privilege,
              })}
              onChange={(e) =>
                onRessourceCheckboxChange(
                  ressource,
                  privilege,
                  e.target.checked
                )
              }
            />
          ),
        })
      ),
  ];

  const onRessourceCheckboxChange = (
    ressource: ACCESS_RESSOURCES,
    privilege: PRIVILEGE,
    checked: boolean
  ) => {
    setRole((prevRole) => {
      if (!prevRole) {
        return prevRole;
      }
      const accessIndex = prevRole.access.findIndex(
        (el) => el.ressource === ressource
      );

      const newAccess = [...prevRole.access];
      const newPrivilege = checked ? privilege : Math.max(privilege - 1, 0);

      if (accessIndex !== -1)
        newAccess[accessIndex] = {
          ...newAccess[accessIndex],
          privileges: newPrivilege,
        };
      else
        newAccess.push({
          ressource,
          privileges: privilege,
        });

      return {
        ...prevRole,
        access: newAccess,
      };
    });
  };

  const canSubmit = JSON.stringify(baseRole.current) !== JSON.stringify(role);

  const onSubmit = async () => {
    if (role && canSubmit) {
      setLoading(true);
      try {
        await Api.authSDK.updateRole({
          params: { id: role._id },
          body: role,
        });
        baseRole.current = role;
        toast.success("Role updated successfully");
      } catch (error) {
        if (
          isApiError<{ message: string }>(error) &&
          error.response?.data.message
        )
          toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  const highlightDisabledRoutes = ({ item }: { item: RessourceItem }) => {
    if (!ressourceAccessDict[item.ressource].grant) return "bg-gray-300";
  };

  return {
    ressources,
    columns,
    highlightDisabledRoutes,
    submitModalProps,
    handleSubmit,
    loading,
    canSubmit,
  };
};
