import { ACCESS_RESSOURCES } from "./AccessRessources";

export enum PRIVILEGE {
  "READ_SELF",
  "WRITE_SELF",
  "DELETE_SELF",
  "READ",
  "WRITE",
  "DELETE",
  "GRANT",
  "REVOKE",
}

export enum ACCESS_TYPE {
  "USER" = "USER",
  "APP" = "APP",
}

export const FULL_ACCESS = PRIVILEGE.REVOKE;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ACCESS<T = any> = {
  ressource: ACCESS_RESSOURCES;
  privileges: PRIVILEGE;
  meta?: T;
};
