import { RoleType } from "api-types/auth-api/models/Role";
import { FULL_ACCESS, PRIVILEGE } from "shared-types";

export const GOD: RoleType = {
  name: "GOD",
  access: [{ ressource: "*", privileges: FULL_ACCESS }],
};

export const PUBLIC_ROLE: RoleType = {
  name: "PUBLIC",
  access: [
    { ressource: "PUBLIC", privileges: FULL_ACCESS },
    { ressource: "USER", privileges: [PRIVILEGE.READ, PRIVILEGE.WRITE] },
  ],
};

export const seedRoles = [PUBLIC_ROLE, GOD];
