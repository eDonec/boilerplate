import { AuthDocument } from "auth-types/models/Auth";
import { ClientRouteTypes } from "auth-types/routes/client";
import { NotFoundError, UnauthorizedError } from "custom-error";
import Auth from "models/Auth";
import Role from "models/Role";
import { getAccessDict, isRoleGrantableToClient } from "services/roles";
import { ACCESS_RESSOURCES } from "shared-types";

import { GOD } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

export const getAuthenticatedClients = async (
  query: ClientRouteTypes["/clients/"]["GET"]["query"]
): Promise<ClientRouteTypes["/clients/"]["GET"]["response"]> =>
  Auth.findPaginated(query, [
    {
      $lookup: {
        from: "roles",
        localField: "role",
        foreignField: "_id",
        as: "role",
      },
    },
    {
      $unwind: {
        path: "$role",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        "role.name": { $ne: "GOD" },
      },
    },
    {
      $addFields: {
        isSuspended: {
          $gt: ["$suspensionLiftTime", new Date()],
        },
      },
    },
  ]);

export const getClientById = async (
  id: string
): Promise<ClientRouteTypes["/clients/:id"]["GET"]["response"]> => {
  const godRole = await Role.findOne({ name: GOD.name });
  const client = await Auth.findOne({
    _id: id,
    role: { $ne: godRole?.id },
  })
    .populate({ path: "role", select: "name" })
    .select("-password -sessions")
    .lean();

  if (!client)
    throw new NotFoundError({
      message: "Client not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });

  return client;
};

export const updateClientAccess = async (
  authId: string,
  currentAuth: AuthDocument,
  {
    role: roleId,
    access,
  }: ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["body"]
) => {
  const [client, role] = await Promise.all([
    Auth.findById(authId).populate("role"),
    Role.findById(roleId),
  ]);

  if (!client)
    throw new NotFoundError({
      message: "Client not found",
      ressource: ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
    });

  if (!role)
    throw new NotFoundError({
      message: "Role not found",
      ressource: ACCESS_RESSOURCES.ROLE,
    });

  const userAccessDict = getAccessDict(
    constructRoleArray(currentAuth.role, currentAuth.customAccessList)
  );
  const selectedAuthAccessDict = getAccessDict(client.role.access);
  const roleAccessDict = getAccessDict(role.access);

  if (
    !isRoleGrantableToClient({
      roleAccessDict,
      userAccessDict,
      selectedAuthAccessDict,
    })
  )
    throw new UnauthorizedError({
      message: "You are not allowed to grant this role to this client",
      ressource: ACCESS_RESSOURCES.ROLE,
      reason: "You are not allowed to grant this role to this client",
    });

  client.role = role;
  client.customAccessList = access;

  await client.save();
};
