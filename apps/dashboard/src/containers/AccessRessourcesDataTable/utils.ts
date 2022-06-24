import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

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
  [ACCESS_RESSOURCES.MICROSERVICE_STATUS]: "View Microservice Status",
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
  access,
  ressource,
  privilege,
}: {
  access: ACCESS[];
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
}) =>
  !!access.find(
    (el) => el.ressource === ressource && el.privileges >= privilege
  );

export const isRessourceCheckboxDisabled = ({
  baseAccess,
  ressource,
  privilege,
  ressourceAccessDict,
}: {
  baseAccess: ACCESS[] | null;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
  ressourceAccessDict: Record<
    ACCESS_RESSOURCES,
    { grant: boolean; revoke: boolean }
  >;
}) => {
  if (!ressourceAccessDict[ressource].grant) return true;
  if (ressourceAccessDict[ressource].revoke) return false;

  const ressourceInBaseRole = baseAccess?.find(
    (el) => el.ressource === ressource
  );

  if (!ressourceInBaseRole) return privilege > PRIVILEGE.GRANT;

  return (
    ressourceInBaseRole.privileges >= privilege || privilege > PRIVILEGE.GRANT
  );
};
