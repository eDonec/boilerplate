import CustomInputError from "custom-error/customInputError";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";

import { statusCodes } from "constants/statusCodes";

import { ISignUpClassicBody } from "types/authNRoutes";

export const signUpClassicValidator: IMiddleware = (req, res, next) => {
  const { email, password, userName }: ISignUpClassicBody = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString().minLength(8);
  if (userName) validators.validate.userName.isString().minLength(6);

  try {
    validators.resolveErrors();
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

export const signInClassicValidator: IMiddleware = (req, res, next) => {
  const { email, password, userName }: ISignUpClassicBody = req.body;
  const validators = new FieldValidator({ email, password, userName });

  try {
    validators.validate.email.exists().isString();
    validators.validate.password.exists().isString();
    if (userName) validators.validate.userName.isString();
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
        .send({ stack: ` ${__dirname} signInClassicValidator line 26` });

    return;
  }

  return next();
};
