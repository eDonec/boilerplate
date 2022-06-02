import { ClientRouteTypes } from "auth-types/routes/client";
import Auth from "models/Auth";

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
  ]);
