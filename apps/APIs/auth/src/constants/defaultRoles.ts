import { RoleType } from "auth-types/models/Role";
import { FULL_ACCESS } from "shared-types";

export const GOD: RoleType = {
  isDefault: true,
  name: "GOD",
  access: [{ ressource: "*", privileges: FULL_ACCESS }],
};

export const PUBLIC_ROLE: RoleType = {
  isDefault: true,
  name: "PUBLIC",
  access: [
    { ressource: "PUBLIC", privileges: FULL_ACCESS },
    { ressource: "USER", privileges: FULL_ACCESS },
  ],
};

export const seedRoles = [PUBLIC_ROLE, GOD];
