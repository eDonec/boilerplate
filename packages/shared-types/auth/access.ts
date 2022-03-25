export enum PRIVILEGE {
  "READ" = "READ",
  "WRITE" = "WRITE",
  "DELETE" = "DELETE",
  "GRANT" = "GRANT",
}

export enum ACCESS_TYPE {
  "USER" = "USER",
  "APP" = "APP",
}

export const FULL_ACCESS = [
  PRIVILEGE.DELETE,
  PRIVILEGE.WRITE,
  PRIVILEGE.DELETE,
  PRIVILEGE.GRANT,
];

export type ACCESS = {
  ressource: string;
  privileges: PRIVILEGE[];
};
