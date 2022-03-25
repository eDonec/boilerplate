import Auth from "models/Auth";
import { nanoid } from "nanoid";
import * as TokenService from "services/tokenServices";
import { ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

import { constructRoleArray } from "helpers/constructRoleArray";

import { ISignUpClassicBody } from "types/authNRoutes";

export {};

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
  const session = createRefreshToken(newAuthClient.id);

  newAuthClient.sessions.push(session);

  await newAuthClient.save();
  const accessToken = TokenService.createAccessToken(
    newAuthClient.id,
    session.sessionId
  );

  return {
    authID: newAuthClient.id,
    token: {
      accessToken,
      refreshToken: session.refreshToken,
    },
    role: newAuthClient.role,
    access: constructRoleArray(
      newAuthClient.role,
      newAuthClient.customAccessList
    ),
  };
};

export const createRefreshToken = (id: string) => {
  const sessionId = nanoid();
  const refreshToken = TokenService.createRefreshToken(id, sessionId);

  return { refreshToken, sessionId };
};
