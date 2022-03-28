import CustomInputError from "custom-error/customInputError";
import { IMiddleware } from "shared-types";
import StringValidator from "string-validator";

import { statusCodes } from "constants/statusCodes";

import { ISignUpClassicBody } from "types/authNRoutes";

export const signUpClassicValidator: IMiddleware = (req, res, next) => {
  const { email, password, userName }: ISignUpClassicBody = req.body;
  const validators = new StringValidator({ email, password, userName });

  try {
    validators.email.exists().isString().isEmail();
    validators.password.exists().isString().isLongerThan(8);
    if (userName) validators.userName.isString().isLongerThan(6);
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(statusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator server-auth",
        fields: error.fields,
        name: error.name,
      });
    else
      res
        .status(statusCodes["Internal Server Error"])
        .send({ stack: ` ${__dirname} signUpClassicValidator line 26` });

    return;
  }

  return next();
};
