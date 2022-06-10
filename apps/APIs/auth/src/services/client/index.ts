import { ClientRouteTypes } from "auth-types/routes/client";
import Auth from "models/Auth";

export const getAuthenticatedClients = async (
  query: ClientRouteTypes["/clients/"]["GET"]["query"]
): Promise<ClientRouteTypes["/clients/"]["GET"]["response"]> =>
  Auth.findPaginated(query, [
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
