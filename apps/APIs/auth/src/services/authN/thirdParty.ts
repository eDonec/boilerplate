/* eslint-disable max-lines */
import { verifyIdToken } from "apple-signin-auth";
import {
  AuthNRouteTypes,
  FacebookUserProfileResponse,
} from "auth-types/routes/authN";
import { InitialUserData } from "auth-types/routes/user";
import axios from "axios";
import { UnauthorizedError } from "custom-error";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { AUTH_PROVIDERS } from "shared-types";

import { generateThirdPartyAuth } from "./helpers";

export const appleSignIn = async ({
  token,
}: AuthNRouteTypes["/n/apple"]["POST"]["body"]): Promise<{
  authResult: Omit<AuthNRouteTypes["/n/apple"]["POST"]["response"], "user">;
  initialUserData: InitialUserData;
}> => {
  const { email, sub } = await verifyIdToken(token);

  const authResult = await generateThirdPartyAuth({
    provider: AUTH_PROVIDERS.APPLE,
    email,
    id: sub,
  });

  return {
    authResult,
    initialUserData: {},
  };
};

export const facebookSignIn = async (
  token: string
): Promise<{
  authResult: Omit<AuthNRouteTypes["/n/facebook"]["POST"]["response"], "user">;
  initialUserData: InitialUserData;
}> => {
  const { data } = await axios.get<FacebookUserProfileResponse>(
    "https://graph.facebook.com/me",
    {
      params: {
        fields: "id,name,picture,last_name,first_name,email,short_name",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const authResult = await generateThirdPartyAuth({
    provider: AUTH_PROVIDERS.FACEBOOK,
    email: data.email,
    id: data.id,
  });

  const initialUserData: InitialUserData = {
    firstName: data.first_name,
    lastName: data.last_name,
    avatar: data.picture.data.is_silhouette ? undefined : data.picture.data.url,
  };

  return { authResult, initialUserData };
};
export const googleSignIn = async (
  token: string
): Promise<{
  authResult: Omit<AuthNRouteTypes["/n/google"]["POST"]["response"], "user">;
  initialUserData: InitialUserData;
}> => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const data = ticket.getPayload();
  const id = ticket.getUserId();

  if (!data || !id)
    throw new UnauthorizedError({
      message: "Invalid Token",
      reason: "Google refused",
    });
  const { email } = data;

  const authResult = await generateThirdPartyAuth({
    provider: AUTH_PROVIDERS.GOOGLE,
    email,
    id,
  });
  const initialUserData: InitialUserData = {
    firstName: data.given_name,
    lastName: data.family_name,
    avatar: data.picture,
  };

  return {
    authResult,
    initialUserData,
  };
};
