import { AuthDocument } from "auth-types/models/Auth";
import { LeanRoleDocument } from "auth-types/models/Role";
import { RolesRouteTypes } from "auth-types/routes/roles";
import { NotFoundError, UnauthorizedError } from "custom-error";
import Role from "models/Role";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { GOD } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

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

export const updateRole = async (
  id: string,
  data: Partial<LeanRoleDocument>,
  currentAuth: AuthDocument
) => {
  const role = await Role.findOne({ _id: id, name: { $ne: GOD.name } });

  if (!role)
    throw new NotFoundError({
      message: `Role with id ${id} not found`,
      ressource: ACCESS_RESSOURCES.ROLE,
    });

  const currentAuthAccess = constructRoleArray(
    currentAuth.role,
    currentAuth.customAccessList
  );
  const godAccountAccess = currentAuthAccess.find(
    (el) => el.ressource === ACCESS_RESSOURCES["*"]
  );

  if (!godAccountAccess || godAccountAccess.privileges < PRIVILEGE.REVOKE)
    data.access?.forEach((access) => {
      const currentAuthAccessRessource = currentAuthAccess.find(
        (a) => a.ressource === access.ressource
      );

      let errorMessage = "";

      if (!currentAuthAccessRessource)
        errorMessage = "Current auth has no access to this ressource";
      else if (currentAuthAccessRessource.privileges < PRIVILEGE.REVOKE) {
        const existingRoleRessourcePrevilege = role.access.find(
          (el) => el.ressource === access.ressource
        );

        if (
          existingRoleRessourcePrevilege &&
          existingRoleRessourcePrevilege.privileges > access.privileges
        )
          errorMessage =
            "Current auth has no revoke privilege to this ressource";
      }

      if (errorMessage)
        throw new UnauthorizedError({
          message: errorMessage,
          ressource: access.ressource,
          reason: "Access denied to this ressource with these privileges",
        });
    });

  await role.updateOne(data);
};
