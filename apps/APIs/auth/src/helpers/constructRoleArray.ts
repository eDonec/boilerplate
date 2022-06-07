import { RoleType } from "auth-types/models/Role";
import { ACCESS } from "shared-types";

export const constructRoleArray = (
  roles: RoleType | undefined,
  custumRoles: ACCESS[]
) => mergeAccessArrays(roles?.access || [], custumRoles);

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
