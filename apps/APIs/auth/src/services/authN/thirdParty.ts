/* eslint-disable max-lines */
import { verifyIdToken } from "apple-signin-auth";
import {
  AuthNRouteTypes,
  FacebookUserProfileResponse,
} from "auth-types/routes/authN";
import axios from "axios";
import { AUTH_PROVIDERS } from "shared-types";

import { generateThirdPartyAuth } from "./helpers";

export const appleSignIn = async ({
  token,
}: AuthNRouteTypes["/n/apple"]["POST"]["body"]): Promise<
  AuthNRouteTypes["/n/apple"]["POST"]["response"]
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
): Promise<AuthNRouteTypes["/n/facebook"]["POST"]["response"]> => {
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
