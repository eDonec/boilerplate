import { RolesRouteTypes } from "auth-types/routes/roles";
import { NotFoundError } from "custom-error";
import Role from "models/Role";
import { ACCESS_RESSOURCES } from "shared-types";

import { GOD } from "constants/defaultRoles";

export const getRoles = async (
  query: RolesRouteTypes["/roles/"]["GET"]["query"]
): Promise<RolesRouteTypes["/roles/"]["GET"]["response"]> =>
  Role.findPaginated({
    ...query,
    match: {
      name: {
        $ne: GOD.name,
      },
    },
  });

export const getRoleById = async (
  id: string
): Promise<RolesRouteTypes["/roles/:id"]["GET"]["response"]> => {
  const role = await Role.findById(id);

  if (!role)
    throw new NotFoundError({
      message: `Role with id ${id} not found`,
      ressource: ACCESS_RESSOURCES.ROLE,
    });

  return role;
};
