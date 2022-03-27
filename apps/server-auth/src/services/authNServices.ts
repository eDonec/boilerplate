import Auth from "models/Auth";
import { nanoid } from "nanoid";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";
import TokenGenerator from "token/TokenGenerator";

import { constructRoleArray } from "helpers/constructRoleArray";

import { ISignUpClassicBody } from "types/authNRoutes";

export const signUpClassic = async ({
  email,
  password,
  userName,
}: ISignUpClassicBody) => {
  const newAuthClient = new Auth({
    email,
    password,
    userName,
    authType: ACCESS_TYPE.USER,
    authProvider: AUTH_PROVIDERS.CLASSIC,
  });

  await newAuthClient.save();
  const sessionId = nanoid();

  const refreshToken = new TokenGenerator(
    {
      aud: "all",
      iss: "server-auth",
      sid: sessionId,
      payload: {
        authId: newAuthClient.id,
        sessionId,
      },
    },
    true
  );

  newAuthClient.sessions.push(sessionId);

  await newAuthClient.save();
  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "server-auth",
    sid: sessionId,
    payload: {
      authId: newAuthClient.id,
    },
  });

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
