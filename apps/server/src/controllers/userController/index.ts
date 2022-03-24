import { Request, Response } from "express";
import * as userService from "services/userService";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.send(users);
  } catch (error) {
    if (error instanceof Error)
      res.status(400).send({ message: error.message, stack: error.stack });
  }
};
