/* eslint-disable max-lines */
import { verifyIdToken } from "apple-signin-auth";
import { AuthDocument } from "auth-types/models/Auth";
import {
  AuthResponse,
  AuthResponseRoutes,
  FacebookUserProfileResponse,
  RouteTypes,
} from "auth-types/routes/authN";
import axios from "axios";
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
}: RouteTypes["/n/classic"]["POST"]["body"]): Promise<
  RouteTypes["/n/classic"]["POST"]["response"]
> => {
  const publicRole = await Role.findOne({ name: PUBLIC_ROLE.name });

  if (!publicRole)
    throw new Error("Public role not found please seed the database!");
  const newAuthClient = new Auth({
    email,
    password,
    userName,
    role: publicRole,
    authType: ACCESS_TYPE.USER,
    authProvider: [AUTH_PROVIDERS.CLASSIC],
  });

  await newAuthClient.save();

  return generateAuthResponse(newAuthClient);
};

export const signInClassic = async (
  authClient: AuthDocument
): Promise<RouteTypes["/n/sign-in/classic"]["POST"]["response"]> =>
  generateAuthResponse(authClient);

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

const generateAuthResponse = async (
  authClient: AuthDocument
): Promise<RouteTypes[AuthResponseRoutes]["POST"]["response"]> => {
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

const generateThirdPartyAuth = async ({
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

export const appleSignIn = async ({
  token,
}: RouteTypes["/n/apple"]["POST"]["body"]): Promise<
  RouteTypes["/n/apple"]["POST"]["response"]
> => {
  const { email, sub } = await verifyIdToken(token);

  return generateThirdPartyAuth({
    provider: AUTH_PROVIDERS.APPLE,
    email,
    id: sub,
  });
};

export const facebookSignIn = async (
  token: string
): Promise<RouteTypes["/n/facebook"]["POST"]["response"]> => {
  const {
    data: { email, id },
  } = await axios.get<FacebookUserProfileResponse>(
    "https://graph.facebook.com/me",
    {
      params: {
        fields: "last_name,first_name,email",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return generateThirdPartyAuth({
    provider: AUTH_PROVIDERS.FACEBOOK,
    email,
    id,
  });
};
