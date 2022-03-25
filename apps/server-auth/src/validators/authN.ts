import { IMiddleware } from "shared-types";

import { statusCodes } from "constants/statusCodes";

import { ISignUpClassicBody } from "types/authNRoutes";

export const signUpClassicValidator: IMiddleware = (req, res, next) => {
  const { email, password, userName }: ISignUpClassicBody = req.body;

  if (!email || !password) {
    res.status(statusCodes.Unauthorized).send({
      message: "Email and password are both mandatory!",
      stack: "authentication validator server-auth",
      fields: ["email", "password"],
    });

    return;
  }

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    (userName && typeof userName !== "string")
  ) {
    res.status(statusCodes.Unauthorized).send({
      message: "Please provide the right body type",
      stack: "authentication validator server-auth",
      fields: ["email", "password", "userName"],
    });

    return;
  }

  if (password.length < 8) {
    res.status(statusCodes.Unauthorized).send({
      message: "Please provide a password with at least 8 characters",
      stack: "authentication validator server-auth",
      fields: ["password"],
    });

    return;
  }

  return next();
};
