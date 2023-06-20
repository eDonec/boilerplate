import { RoleType } from "auth-types/models/Role";
import {
  ACCESS,
  ACCESS_RESSOURCES,
  FULL_ACCESS,
  PRIVILEGE,
} from "shared-types";

const PUBLIC_ACCESS: ACCESS[] = [
  { ressource: ACCESS_RESSOURCES.PUBLIC, privileges: FULL_ACCESS },
  {
    ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    privileges: PRIVILEGE.DELETE_SELF,
  },
];

// eslint-disable-next-line unused-imports/no-unused-vars
const mergeAccessArrays = (base: ACCESS[], overRide: ACCESS[]) => {
  const result = base.slice();

  overRide.forEach((overRideElement) => {
    const existingElement = result.find(
      (element) => element.ressource === overRideElement.ressource
    );

    if (existingElement) {
      existingElement.privileges = overRideElement.privileges;
    } else {
      result.push(overRideElement);
    }
  });

  return result;
};

export const GOD: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "GOD",
  access: [{ ressource: ACCESS_RESSOURCES["*"], privileges: FULL_ACCESS }],
};
export const SUPER_ADMIN: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "SUPER_ADMIN",
  access: Object.values(ACCESS_RESSOURCES)
    .filter((el) => el !== ACCESS_RESSOURCES["*"])
    .map((ressource) => ({
      ressource,
      privileges: FULL_ACCESS,
    })),
};

export const PUBLIC_ROLE: Omit<RoleType, "_id"> = {
  isDefault: true,
  name: "PUBLIC",
  access: PUBLIC_ACCESS,
};

export const seedRoles = [PUBLIC_ROLE, GOD, SUPER_ADMIN];
