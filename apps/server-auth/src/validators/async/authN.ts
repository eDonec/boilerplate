import Auth from "models/Auth";
import { IMiddleware } from "shared-types";

import { statusCodes } from "constants/statusCodes";

import { ISignUpClassicBody } from "types/authNRoutes";

export const signUpClassicValidator: IMiddleware = async (req, res, next) => {
  const { email, userName }: ISignUpClassicBody = req.body;
  const authUsersByEmail = await Auth.find({ email });

  if (authUsersByEmail.length) {
    res.status(statusCodes.Unauthorized).send({
      message: "Email already in use!",
      stack: "authentication validator server-auth",
      fields: ["email"],
    });

    return;
  }
  if (!userName) return next();

  const authUsersByUserName = await Auth.find({ userName });

  if (authUsersByUserName.length) {
    res.status(statusCodes.Unauthorized).send({
      message: "Email and password are both mandatory!",
      stack: "authentication validator server-auth",
      fields: ["userName"],
    });

    return;
  }

  return next();
};
