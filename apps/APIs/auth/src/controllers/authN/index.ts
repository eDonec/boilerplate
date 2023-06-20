import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthDocument } from "auth-types/models/Auth";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { browserName, detectOS } from "detect-browser";
import { Request, Response } from "http-server";
import * as authNService from "services/authN";
import * as userService from "services/user";
import { ACCESS, IMiddleware, StatusCodes } from "shared-types";
import TokenValidator from "token/TokenValidator";

export const signUpClassic: IAuthServerMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>,
  AuthNRouteTypes["/n/classic"]["POST"]["response"]
> = async (req, res) => {
  const authResult = await authNService.signUpClassic(req.body);
  const user = await userService.createUser(authResult.authID);

  res.status(StatusCodes.Created).send({ ...authResult, user });
};

export const signInClassic: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]
> = async (_, res) => {
  const { currentAuth } = res.locals;
  const authResult = await authNService.signInClassic(currentAuth);

  res.status(StatusCodes.OK).send(authResult);
};

export const logoutAuthClientFromSession: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/logout"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (_, res) => {
  const { currentAuth, refreshToken } = res.locals;

  currentAuth.sessions = currentAuth.sessions.filter(
    (session) => refreshToken.decodedToken.sid !== session
  );
  await currentAuth.save();

  res.status(StatusCodes.OK).send();
};

export * from "./thirdParty";

export const getAuthByAccessToken: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<
    AuthNRouteTypes["/n/me"]["GET"]["response"],
    {
      token: TokenValidator<{ authId: string; access: ACCESS[] }>;
      currentAuth: AuthDocument;
    }
  >
> = async (_, res) => {
  const response = await authNService.getAuthByAccessToken(
    res.locals.currentAuth,
    res.locals.token.token
  );

  res.status(StatusCodes.OK).send(response);
};

export const updatePassword: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/update-password"]["PUT"]["body"],
    unknown
  >,
  Response<
    AuthNRouteTypes["/n/update-password"]["PUT"]["response"],
    {
      currentAuth: AuthDocument;
    }
  >
> = async (req, res) => {
  await authNService.updatePassword(
    res.locals.currentAuth,
    req.body.newPassword
  );

  res.status(StatusCodes.OK).send("OK");
};

export const resetPassword: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/reset-password"]["PUT"]["body"],
    unknown
  >,
  Response<AuthNRouteTypes["/n/reset-password"]["PUT"]["response"]>
> = async (req, res) => {
  let ip =
    // @ts-expect-error cf-connecting-ip is not in the type but is populated by cloudflare
    req.header["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress;

  // eslint-disable-next-line prefer-destructuring
  if (typeof ip === "string" && ip.includes(",")) ip = ip.split(",")[0];
  const browser = browserName(req.headers["user-agent"] || "");
  const os = detectOS(req.headers["user-agent"] || "");
  let country = null;

  try {
    const response = await fetch(
      `https://api.iplocation.net/?ip=${ip?.toString()}`
    );
    const data = await response.json();

    country = data.country_name;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  await authNService.resetPassword(
    req.body.emailOrUsername,
    browser,
    os,
    country
  );

  res.status(StatusCodes.OK).send("OK");
};

export const resetPasswordConfirm: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["body"],
    AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["query"]
  >,
  Response<AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["response"]>
> = async (req, res) => {
  await authNService.resetPasswordConfirm(
    req.query.token,
    req.body.newPassword
  );

  res.status(StatusCodes.OK).send("OK");
};
