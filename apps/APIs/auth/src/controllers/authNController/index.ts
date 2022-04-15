import { ResponseTypes } from "api-types/auth-api/authNRoutes";
import IAuthServerMiddleware from "api-types/auth-api/IAuthServerMiddleware";
import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as authNServices from "services/authNServices";
import { IMiddleware, StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

export const signUpClassic: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/classic"]["POST"]["body"]>
> = async (req, res) => {
  try {
    const authResult = await authNServices.signUpClassic(req.body);

    res.status(StatusCodes.Created).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const signInClassic: IAuthServerMiddleware<
  Request,
  ResponseTypes["/n/sign-in/classic"]["POST"]["response"]
> = async (req, res) => {
  const { currentAuth } = res.locals;

  try {
    const authResult = await authNServices.signInClassic(currentAuth);

    res.status(StatusCodes.OK).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  ResponseTypes["/n/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (req, res) => {
  const { currentAuth, refreshToken } = res.locals;

  try {
    const accessToken = new TokenGenerator({
      aud: "all",
      iss: "auth",
      sid: refreshToken.decodedToken.sid,
      payload: {
        authId: currentAuth.id,
      },
    });

    res.status(StatusCodes.Created).send(accessToken.token);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const logoutAuthClientFromSession: IAuthServerMiddleware<
  Request,
  ResponseTypes["/n/logout"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (req, res) => {
  const { currentAuth, refreshToken } = res.locals;

  try {
    currentAuth.sessions = currentAuth.sessions.filter(
      (session) => refreshToken.decodedToken.sid !== session
    );
    await currentAuth.save();

    res.status(StatusCodes.OK).send();
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const facebookSignIn: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/facebook"]["POST"]["body"]>,
  Response<
    | ResponseTypes["/n/facebook"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = async (req, res) => {
  try {
    const authResult = await authNServices.facebookSignIn(req.body.token);

    res.status(StatusCodes.Created).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
export const appleSignIn: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/apple"]["POST"]["body"]>,
  Response<
    | ResponseTypes["/n/apple"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = async (req, res) => {
  try {
    const authResult = await authNServices.appleSignIn(req.body);

    res.status(StatusCodes.Created).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(StatusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
