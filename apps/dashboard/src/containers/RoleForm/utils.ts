import { LeanRoleDocument } from "auth-types/models/Role";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { RessourceItem } from "./types";

export const privilegesTitleDict: Record<PRIVILEGE, string> = {
  [PRIVILEGE.READ_SELF]: "Read Self",
  [PRIVILEGE.WRITE_SELF]: "Write Self",
  [PRIVILEGE.DELETE_SELF]: "Delete Self",
  [PRIVILEGE.READ]: "Read",
  [PRIVILEGE.WRITE]: "Write",
  [PRIVILEGE.DELETE]: "Delete",
  [PRIVILEGE.GRANT]: "Grant",
  [PRIVILEGE.REVOKE]: "Revoke",
};

export const ressourcesTitleDict: Record<ACCESS_RESSOURCES, string> = {
  [ACCESS_RESSOURCES["*"]]: "*",
  [ACCESS_RESSOURCES.USER]: "Users",
  [ACCESS_RESSOURCES.ROLE]: "Roles",
  [ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS]: "Authenticated Clients",
  [ACCESS_RESSOURCES.PUBLIC]: "Public",
  [ACCESS_RESSOURCES.BAN_CLIENTS]: "Ban Clients",
  [ACCESS_RESSOURCES.LIFT_BAN_AND_SUSPENSION]: "Lift Ban and Suspension",
  [ACCESS_RESSOURCES.SUSPEND_CLIENTS]: "Suspend Clients",
};

export const isVisiblePrevilege = (input: unknown): input is PRIVILEGE =>
  typeof input === "number" &&
  Object.values(PRIVILEGE).includes(input as PRIVILEGE) &&
  input > PRIVILEGE.DELETE_SELF;

export const ressources: RessourceItem[] = Object.values(ACCESS_RESSOURCES)
  .filter((ressource) => ressource !== ACCESS_RESSOURCES["*"])
  .map((ressource) => ({
    title: ressourcesTitleDict[ressource],
    ressource,
  }));

export const isRessourceCheckboxChecked = ({
  role,
  ressource,
  privilege,
}: {
  role: Partial<LeanRoleDocument> | null;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
}) =>
  !!role?.access?.find(
    (el) => el.ressource === ressource && el.privileges >= privilege
  );

export const isRessourceCheckboxDisabled = ({
  baseRole,
  ressource,
  privilege,
  ressourceAccessDict,
}: {
  baseRole: Partial<LeanRoleDocument> | null;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
  ressourceAccessDict: Record<
    ACCESS_RESSOURCES,
    { grant: boolean; revoke: boolean }
  >;
}) => {
  if (!ressourceAccessDict[ressource].grant) return true;
  if (ressourceAccessDict[ressource].revoke) return false;
  const isInBaseRole = !baseRole?.access?.find(
    (el) => el.ressource === ressource && el.privileges < privilege
  );

  return isInBaseRole || privilege > PRIVILEGE.GRANT;
};
