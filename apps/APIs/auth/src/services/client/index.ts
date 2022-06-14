import { ClientRouteTypes } from "auth-types/routes/client";
import { NotFoundError } from "custom-error";
import Auth from "models/Auth";
import Role from "models/Role";
import { ACCESS_RESSOURCES } from "shared-types";

import { GOD } from "constants/defaultRoles";

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
