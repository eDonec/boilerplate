export enum PRIVILEGE {
  "READ" = "READ",
  "WRITE" = "WRITE",
  "DELETE" = "DELETE",
  "GRANT" = "GRANT",
  "REVOKE" = "REVOKE",
}

export enum ACCESS_TYPE {
  "USER" = "USER",
  "APP" = "APP",
}

export const FULL_ACCESS = [
  PRIVILEGE.READ,
  PRIVILEGE.WRITE,
  PRIVILEGE.DELETE,
  PRIVILEGE.GRANT,
  PRIVILEGE.REVOKE,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ACCESS<T = any> = {
  ressource: string;
  privileges: PRIVILEGE[];
  meta?: T;
};
