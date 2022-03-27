import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as authNServices from "services/authNServices";

import { statusCodes } from "constants/statusCodes";

export const signUpClassic = async (req: Request, res: Response) => {
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
