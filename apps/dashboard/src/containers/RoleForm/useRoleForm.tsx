import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import { accessMatcher } from "containers/AuthWrappers/AccessProtectedWrapper/useAccessProtectedWrapper";

import { useAppSelector } from "hooks/reduxHooks";

import { RessourceItem, RoleFormProps } from "./types";
import {
  isRessourceCheckboxChecked,
  isRessourceCheckboxDisabled,
  isVisiblePrevilege,
  privilegesTitleDict,
  ressources,
} from "./utils";

export const useRoleForm = ({ role, setRole, baseRole }: RoleFormProps) => {
  const currentUserAccess = useAppSelector((state) => state.auth.access);

  const isFormReadOnly = !accessMatcher(
    currentUserAccess,
    ACCESS_RESSOURCES.ROLE,
    PRIVILEGE.WRITE
  );

  const ressourceAccessDict = Object.values(ACCESS_RESSOURCES).reduce<
    Record<ACCESS_RESSOURCES, { grant: boolean; revoke: boolean }>
  >((acc, value) => {
    acc[value] = {
      grant: accessMatcher(currentUserAccess, value, PRIVILEGE.GRANT),
      revoke: accessMatcher(currentUserAccess, value, PRIVILEGE.REVOKE),
    };

    return acc;
  }, {} as Record<ACCESS_RESSOURCES, { grant: boolean; revoke: boolean }>);

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
              type="checkbox"
              disabled={
                isFormReadOnly ||
                isRessourceCheckboxDisabled({
                  baseRole: baseRole.current,
                  ressource,
                  privilege,
                  ressourceAccessDict,
                })
              }
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
      if (!prevRole?.access) {
        return prevRole;
      }
      const accessIndex = prevRole.access.findIndex(
        (el) => el.ressource === ressource
      );

      const newAccess = [...prevRole.access];
      const newPrivilege = checked
        ? privilege
        : Math.max(privilege - 1, PRIVILEGE.DELETE_SELF);

      if (accessIndex !== -1) {
        if (
          newPrivilege <= PRIVILEGE.DELETE_SELF &&
          !baseRole.current?.access?.find((el) => el.ressource === ressource)
        )
          newAccess.splice(accessIndex, 1);
        else
          newAccess[accessIndex] = {
            ...newAccess[accessIndex],
            privileges: newPrivilege,
          };
      } else
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

  const highlightDisabledRessources = ({ item }: { item: RessourceItem }) => {
    if (!isFormReadOnly && !ressourceAccessDict[item.ressource].grant)
      return "bg-gray-300";
  };

  const onTitleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setRole((prevRole) => {
      if (!prevRole) {
        return prevRole;
      }

      return {
        ...prevRole,
        name: e.target.value,
      };
    });
  };

  return {
    ressources,
    columns,
    highlightDisabledRessources,
    onTitleChange,
    isFormReadOnly,
  };
};
