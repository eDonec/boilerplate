import { RoleType } from "auth-types/models/Role";
import { ACCESS_RESSOURCES, FULL_ACCESS, PRIVILEGE } from "shared-types";

const PUBLIC_ACCESS = [
  { ressource: ACCESS_RESSOURCES.PUBLIC, privileges: FULL_ACCESS },
  { ressource: ACCESS_RESSOURCES.USER, privileges: PRIVILEGE.DELETE_SELF },
];

export const GOD: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "GOD",
  access: [{ ressource: ACCESS_RESSOURCES["*"], privileges: FULL_ACCESS }],
};

export const SUPER_ADMIN: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "SUPER_ADMIN",
  access: [
    ...PUBLIC_ACCESS,
    { ressource: ACCESS_RESSOURCES.ROLE, privileges: FULL_ACCESS },
    { ressource: ACCESS_RESSOURCES.USER, privileges: FULL_ACCESS },
  ],
};

export const PUBLIC_ROLE: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "PUBLIC",
  access: PUBLIC_ACCESS,
};

export const seedRoles = [PUBLIC_ROLE, GOD, SUPER_ADMIN];
