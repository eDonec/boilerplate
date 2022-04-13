import { ISignUpClassicBody } from "api-types/auth-api/authNRoutes";
import Auth from "models/Auth";
import { IMiddleware } from "shared-types";

import { statusCodes } from "constants/statusCodes";

export const signUpClassicValidator: IMiddleware = async (req, res, next) => {
  const { email, userName }: ISignUpClassicBody = req.body;
  const authUsersByEmail = await Auth.find({ email });

  if (authUsersByEmail.length) {
    res.status(statusCodes.Unauthorized).send({
      message: "Email already in use!",
      stack: "authentication validator auth",
      fields: ["email"],
    });

    return;
  }
  if (!userName) return next();

  const authUsersByUserName = await Auth.find({ userName });

  if (authUsersByUserName.length) {
    res.status(statusCodes.Unauthorized).send({
      message: "Email already in use!",
      stack: "authentication validator auth",
      fields: ["userName"],
    });

    return;
  }

  return next();
};
