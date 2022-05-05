/* eslint-disable max-lines */
/* eslint-disable max-lines */
import { AuthDocument } from "auth-types/models/Auth";
import {
  AuthNRouteTypes,
  AuthResponse,
  AuthResponseRoutes,
} from "auth-types/routes/authN";
import producer from "events/producer";
import Auth from "models/Auth";
import Role from "models/Role";
import { nanoid } from "nanoid";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";
import TokenGenerator from "token/TokenGenerator";

import { PUBLIC_ROLE } from "constants/defaultRoles";

import { constructRoleArray } from "helpers/constructRoleArray";

export const generateAuthResponse = async (
  authClient: AuthDocument
): Promise<AuthNRouteTypes[AuthResponseRoutes]["POST"]["response"]> => {
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

export const generateThirdPartyAuth = async ({
  provider,
  id,
  email,
  userName,
}: {
  provider: AUTH_PROVIDERS;
  id: string;
  email?: string;
  userName?: string;
}): Promise<AuthResponse> => {
  let authClient = await Auth.findOne({
    authProvider: provider,
    "providerId.id": id,
  });

  if (!authClient) {
    authClient = await Auth.findOne({
      $or: [{ email }, { userName }],
    });
  }

  if (authClient) {
    if (!authClient.authProvider.includes(provider)) {
      authClient.authProvider.push(provider);
      authClient.providerId?.push({ provider, id });
      await authClient.save();
      producer.emit.UserLinkedAccountToOAuth2({
        authId: authClient.id,
        provider,
        providerId: id,
        createdAt: new Date(),
      });
    }
  } else {
    const publicRole = await Role.findOne({ name: PUBLIC_ROLE.name });

    if (!publicRole)
      throw new Error("Public role not found please seed the database!");

    authClient = await Auth.create({
      email,
      userName,
      role: publicRole,
      authType: ACCESS_TYPE.USER,
      authProvider: [provider],
      providerId: [{ provider, id }],
    });
  }

  return generateAuthResponse(authClient);
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

  producer.emit.UserCreatedNewSession({
    authId: authClient.id,
    sessionId,
    createdAt: new Date(),
  });

  return { accessToken, refreshToken };
};
