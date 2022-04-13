import { ISignUpClassicBody } from "api-types/auth-api/authNRoutes";
import { AuthDocument } from "api-types/auth-api/models/Auth";
import Auth from "models/Auth";
import Role from "models/Role";
import { nanoid } from "nanoid";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";
import TokenGenerator from "token/TokenGenerator";

import { PUBLIC_ROLE } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

export const signUpClassic = async ({
  email,
  password,
  userName,
}: ISignUpClassicBody) => {
  const pulbicRole = await Role.findOne({ name: PUBLIC_ROLE.name });

  if (!pulbicRole)
    throw new Error("Public role not found please seed the database!");
  const newAuthClient = new Auth({
    email,
    password,
    userName,
    role: pulbicRole,
    authType: ACCESS_TYPE.USER,
    authProvider: [AUTH_PROVIDERS.CLASSIC],
  });

  await newAuthClient.save();
  const { accessToken, refreshToken } = await createNewSession(newAuthClient);

  return {
    authID: newAuthClient.id,
    token: {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    },
    role: newAuthClient.role,
    access: constructRoleArray(
      newAuthClient.role,
      newAuthClient.customAccessList
    ),
  };
};

export const signInClassic = async (authClient: AuthDocument) => {
  const { accessToken, refreshToken } = await createNewSession(authClient);

  return {
    authID: authClient.id,
    token: {
      accessToken: accessToken.token,
      refreshToken: refreshToken.token,
    },
    role: authClient.role,
    access: constructRoleArray(authClient.role, authClient.customAccessList),
  };
};

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

  return authClient.save();
};

const createNewSession = async (authClient: AuthDocument) => {
  const sessionId = nanoid();

  const refreshToken = new TokenGenerator(
    {
      aud: "all",
      iss: "auth",
      sid: sessionId,
      payload: {
        authId: authClient.id,
      },
    },
    true
  );

  authClient.sessions.push(sessionId);

  await authClient.save();
  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "auth",
    sid: sessionId,
    payload: {
      authId: authClient.id,
    },
  });

  return { accessToken, refreshToken };
};
