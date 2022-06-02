import { AuthDocument } from "auth-types/models/Auth";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import producer from "events/producer";
import Role from "models/Role";

import { GOD } from "constants/defaultRoles";

export const suspendClient = (
  authClient: AuthDocument,
  suspention: {
    suspentionLiftTime: Date;
    suspentionReason: string;
  }
) => {
  authClient.isSuspended = true;
  authClient.suspentionLiftTime = suspention.suspentionLiftTime;
  authClient.suspentionReason = suspention.suspentionReason;

  producer.emit.UserSuspended({
    authId: authClient.id,
    suspentionLiftTime: suspention.suspentionLiftTime,
    suspentionReason: suspention.suspentionReason,
  });

  return authClient.save();
};

export const getRoles = async (
  query: AuthZRouteTypes["/z/roles"]["GET"]["query"]
): Promise<AuthZRouteTypes["/z/roles"]["GET"]["response"]> =>
  Role.findPaginated({
    ...query,
    match: {
      name: {
        $ne: GOD.name,
      },
    },
  });
