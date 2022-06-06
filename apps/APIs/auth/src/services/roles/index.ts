import { RoleRouteTypes } from "auth-types/routes/roles";
import Role from "models/Role";

import { GOD } from "constants/defaultRoles";

export const getRoles = async (
  query: RoleRouteTypes["/roles/"]["GET"]["query"]
): Promise<RoleRouteTypes["/roles/"]["GET"]["response"]> =>
  Role.findPaginated({
    ...query,
    match: {
      name: {
        $ne: GOD.name,
      },
    },
  });
