import { useState } from "react";
import { useParams } from "react-router-dom";

import Api from "api";
import { LeanRoleDocument } from "auth-types/models/Role";
import { useFirstMount } from "core-hooks";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

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
  [ACCESS_RESSOURCES.USER]: "Users",
  [ACCESS_RESSOURCES.ROLE]: "Roles",
  [ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS]: "Authenticated Clients",
  [ACCESS_RESSOURCES.PUBLIC]: "Public",
  [ACCESS_RESSOURCES["*"]]: "*",
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
}) => {
  const isChecked = !!role?.access.find(
    (el) => el.ressource === ressource && el.privileges >= privilege
  );

  return isChecked;
};

export const useRoleDetails = () => {
  const [role, setRole] = useState<LeanRoleDocument | null>(null);
  const isFirstMount = useFirstMount();
  const { id } = useParams<{ id: string }>();

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

  return {
    ressources,
    columns,
  };
};
