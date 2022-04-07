import { RoleType } from "models/Role/types";
import { ACCESS } from "shared-types";

export const constructRoleArray = (
  roles: RoleType | undefined,
  custumRoles: ACCESS[]
) =>
  roles?.access?.map((role) => {
    const customRole = custumRoles.find(
      (el) => el.ressource === role.ressource
    );

    return customRole || role;
  }) || custumRoles;