import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthDocument } from "auth-types/models/Auth";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { Request, Response } from "http-server";
import * as authNService from "services/authN";
import { ACCESS, IMiddleware, StatusCodes } from "shared-types";
import TokenValidator from "token/TokenValidator";

export const signUpClassic: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>
> = async (req, res) => {
  const authResult = await authNService.signUpClassic(req.body);

  res.status(StatusCodes.Created).send(authResult);
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
> = async (req, res) => {
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
> = async (req, res) => {
  const response = authNService.getAuthByAccessToken(
    res.locals.currentAuth,
    res.locals.token.token
  );

  res.status(StatusCodes.OK).send(response);
};
