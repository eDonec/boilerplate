export enum PRIVILEGE {
  "READ" = "READ",
  "READ_SELF" = "READ_SELF",
  "WRITE" = "WRITE",
  "WRITE_SELF" = "WRITE_SELF",
  "DELETE" = "DELETE",
  "DELETE_SELF" = "DELETE_SELF",
  "GRANT" = "GRANT",
  "REVOKE" = "REVOKE",
}

export enum ACCESS_TYPE {
  "USER" = "USER",
  "APP" = "APP",
}

export const FULL_ACCESS = [
  PRIVILEGE.READ,
  PRIVILEGE.READ_SELF,
  PRIVILEGE.WRITE,
  PRIVILEGE.WRITE_SELF,
  PRIVILEGE.DELETE,
  PRIVILEGE.DELETE_SELF,
  PRIVILEGE.GRANT,
  PRIVILEGE.REVOKE,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ACCESS<T = any> = {
  ressource: string;
  privileges: PRIVILEGE[];
  meta?: T;
};
