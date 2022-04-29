import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import middlewareWithTryCatch from "errors/middlewareWithTryCatch";
import { Request, Response } from "express";
import * as authNServices from "services/authN";
import { IMiddleware, StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

export const signUpClassic: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNServices.signUpClassic(req.body);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);

export const signInClassic: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]
> = middlewareWithTryCatch(async (_, res) => {
  const { currentAuth } = res.locals;

  const authResult = await authNServices.signInClassic(currentAuth);

  res.status(StatusCodes.OK).send(authResult);
}, StatusCodes["Bad Request"]);

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = middlewareWithTryCatch(async (_, res) => {
  const { currentAuth, refreshToken } = res.locals;

  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "auth",
    sid: refreshToken.decodedToken.sid,
    payload: {
      authId: currentAuth.id,
    },
  });

  res.status(StatusCodes.Created).send(accessToken.token);
}, StatusCodes["Bad Request"]);

export const logoutAuthClientFromSession: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/logout"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = middlewareWithTryCatch(async (req, res) => {
  const { currentAuth, refreshToken } = res.locals;

  currentAuth.sessions = currentAuth.sessions.filter(
    (session) => refreshToken.decodedToken.sid !== session
  );
  await currentAuth.save();

  res.status(StatusCodes.OK).send();
}, StatusCodes["Bad Request"]);

export const facebookSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<
    | AuthNRouteTypes["/n/facebook"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNServices.facebookSignIn(req.body.token);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);
export const appleSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<
    | AuthNRouteTypes["/n/apple"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNServices.appleSignIn(req.body);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);
