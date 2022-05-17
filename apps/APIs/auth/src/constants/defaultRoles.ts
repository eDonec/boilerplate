import { RoleType } from "auth-types/models/Role";
import { FULL_ACCESS } from "shared-types";

const PUBLIC_ACCESS = [
  { ressource: "PUBLIC", privileges: FULL_ACCESS },
  { ressource: "USER", privileges: FULL_ACCESS },
];

export const GOD: RoleType = {
  isDefault: true,
  name: "GOD",
  access: [{ ressource: "*", privileges: FULL_ACCESS }],
};

export const SUPER_ADMIN: RoleType = {
  isDefault: true,
  name: "SUPER_ADMIN",
  access: [...PUBLIC_ACCESS, { ressource: "ROLE", privileges: FULL_ACCESS }],
};

export const PUBLIC_ROLE: RoleType = {
  isDefault: true,
  name: "PUBLIC",
  access: PUBLIC_ACCESS,
};

export const seedRoles = [PUBLIC_ROLE, GOD, SUPER_ADMIN];
