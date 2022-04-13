import IAuthServerMiddleware from "api-types/auth-api/IAuthServerMiddleware";
import { AuthDocument } from "api-types/auth-api/models/Auth";
import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as authNServices from "services/authNServices";
import { IMiddleware } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

import { statusCodes } from "constants/statusCodes";

export const signUpClassic: IMiddleware = async (req, res) => {
  try {
    const authResult = await authNServices.signUpClassic(req.body);

    res.status(statusCodes.Created).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
export const signInClassic: IAuthServerMiddleware = async (req, res) => {
  const { currentAuth } = res.locals;

  try {
    const authResult = await authNServices.signInClassic(currentAuth);

    res.status(statusCodes.OK).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const refreshAccessToken: IMiddleware<
  Request,
  Response<
    string | { message: string; stack: string | undefined },
    {
      currentAuth: AuthDocument;
      refreshToken: TokenValidator<{ authId: string }>;
    }
  >
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

    res.status(statusCodes.Created).send(accessToken.token);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};

export const logoutAuthClientFromSession: IMiddleware<
  Request,
  Response<
    string | { message: string; stack: string | undefined },
    {
      currentAuth: AuthDocument;
      refreshToken: TokenValidator<{ authId: string }>;
    }
  >
> = async (req, res) => {
  const { currentAuth, refreshToken } = res.locals;

  try {
    currentAuth.sessions = currentAuth.sessions.filter(
      (session) => refreshToken.decodedToken.sid !== session
    );
    await currentAuth.save();

    res.status(statusCodes.OK).send();
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
