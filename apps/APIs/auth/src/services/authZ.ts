import { AuthDocument } from "auth-types/models/Auth";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { NotFoundError, UnauthorizedError } from "custom-error";
import producer from "events/producer";
import Auth from "models/Auth";
import Role from "models/Role";
import { ACCESS_RESSOURCES } from "shared-types";
import TokenGenerator from "token/TokenGenerator";

import { GOD } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

import { getAccessDict, isRoleGrantableToClient } from "./roles";

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
    await Auth.findByIdAndUpdate(id, {
      isBanned: false,
      isSuspended: false,
      suspensionLiftTime: null,
    });
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

  return {
    status: "OK",
  };
};

export const getUploadToken = (mimeTypes: string | string[]) =>
  new TokenGenerator(
    {
      aud: "bucket",
      iss: "auth",
      sid: "none",
      payload: {
        mimeTypes: mimeTypes instanceof Array ? mimeTypes : [mimeTypes],
      },
    },
    false,
    process.env.UPLOAD_SECRET_KEY,
    process.env.UPLOAD_TOKEN_EXPIRES_IN
  );

export const updateClientAccess = async (
  authId: string,
  currentAuth: AuthDocument,
  { role: roleId, access }: AuthZRouteTypes["/z/access/:id"]["PUT"]["body"]
) => {
  const [client, role] = await Promise.all([
    Auth.findById(authId),
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
