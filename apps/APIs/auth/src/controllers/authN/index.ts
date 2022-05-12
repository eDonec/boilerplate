import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { Request } from "http-server";
import * as authNService from "services/authN";
import { IMiddleware, StatusCodes } from "shared-types";
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
