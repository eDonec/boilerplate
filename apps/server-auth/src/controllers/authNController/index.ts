import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as authNServices from "services/authNServices";

import { statusCodes } from "constants/statusCodes";

export const getUsers = async (req: Request, res: Response) => {
  try {
    // const users = await userService.getUsers();
    res.send();
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
export const signUpClassic = async (req: Request, res: Response) => {
  try {
    const authResult = await authNServices.signUpClassic(req.body);

    res.send(authResult);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
