import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as authNServices from "services/authNServices";
import { IMiddleware } from "shared-types";

import { statusCodes } from "constants/statusCodes";

import IAuthServerMiddleware from "types/IAuthServerMiddleware";

export const signUpClassic: IMiddleware = async (
  req: Request,
  res: Response
) => {
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
export const signInClassic: IAuthServerMiddleware = async (
  req: Request,
  res: Response
) => {
  const { currentAuth } = res.locals;

  try {
    const authResult = await authNServices.signInClassic(currentAuth);

    res.status(statusCodes.Created).send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
