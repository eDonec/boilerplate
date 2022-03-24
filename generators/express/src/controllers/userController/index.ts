import { errorLogger } from "errors/errorLogger";
import { Request, Response } from "express";
import * as userService from "services/userService";

import { statusCodes } from "constants/statusCodes";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (error) {
    if (error instanceof Error)
      res
        .status(statusCodes["Bad Request"])
        .send({ message: error.message, stack: error.stack });
    errorLogger(req, error);
  }
};
