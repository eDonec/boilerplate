import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import middlewareWithTryCatch from "errors/middlewareWithTryCatch";
import { Request } from "express";
import * as authNService from "services/authN";
import { IMiddleware, StatusCodes } from "shared-types";
import TokenValidator from "token/TokenValidator";

export const signUpClassic: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNService.signUpClassic(req.body);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);

export const signInClassic: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]
> = middlewareWithTryCatch(async (_, res) => {
  const { currentAuth } = res.locals;

  const authResult = await authNService.signInClassic(currentAuth);

  res.status(StatusCodes.OK).send(authResult);
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

export * from "./thirdParty";
