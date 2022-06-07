import { AuthDocument } from "auth-types/models/Auth";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { NotFoundError } from "custom-error";
import producer from "events/producer";
import Auth from "models/Auth";
import Role from "models/Role";

import { GOD } from "constants/defaultRoles";

export const suspendClient = async (
  authClient: AuthDocument | string,
  suspention: {
    suspensionLiftTime: Date;
    suspensionReason: string;
    suspendedByUserId: string;
  }
) => {
  let localAuthDocument: AuthDocument | null;

  if (typeof authClient === "string")
    try {
      localAuthDocument = await Auth.findOne({ _id: authClient });
    } catch (error) {
      throw new NotFoundError({
        message: "No auth client found",
        ressource: "AuthClient",
      });
    }
  else localAuthDocument = authClient;
  if (!localAuthDocument)
    throw new NotFoundError({
      message: "No auth client found",
      ressource: "AuthClient",
    });

  localAuthDocument.isSuspended = true;
  localAuthDocument.suspensionLiftTime = suspention.suspensionLiftTime;
  localAuthDocument.suspensionReason = suspention.suspensionReason;

  producer.emit.UserSuspended({
    authId: localAuthDocument.id,
    suspensionLiftTime: suspention.suspensionLiftTime,
    suspensionReason: suspention.suspensionReason,
  });

  return localAuthDocument.save();
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

export const banClient = async ({
  id,
  reason,
  bannedByUserId,
}: {
  id: string;
  reason: string;
  bannedByUserId: string;
}): Promise<AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]> => {
  try {
    await Auth.findByIdAndUpdate(id, { isBanned: true });
    producer.emit.UserBanned({
      authId: id,
      reason,
      createdAt: new Date(),
      bannedByUserId,
    });
  } catch (error) {
    throw new NotFoundError({
      message: "No auth client found",
      ressource: "AuthClient",
    });
  }

  return { status: "OK" };
};

export const liftBanAndSuspension = async ({
  id,
  liftedByUserId,
}: {
  id: string;
  liftedByUserId: string;
}): Promise<
  AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]
> => {
  try {
    await Auth.findByIdAndUpdate(id, { isBanned: false, isSuspended: false });
    producer.emit.UserBanAndSuspensionLifted({
      authId: id,
      createdAt: new Date(),
      liftedByUserId,
    });
  } catch (error) {
    throw new NotFoundError({
      message: "No auth client found",
      ressource: "AuthClient",
    });
  }

  return { status: "OK" };
};
