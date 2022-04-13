import {
  ISignInClassicBody,
  ISignUpClassicBody,
} from "api-types/auth-api/authNRoutes";
import CustomInputError from "custom-error/customInputError";
import { Request } from "express";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

import { statusCodes } from "constants/statusCodes";

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
        stack: "authentication validator auth",
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
  const { email, password, userName }: ISignInClassicBody = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
  try {
    validators.resolveErrors();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(statusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator auth",
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

export const tokenValidator =
  (isRefreshToken = false): IMiddleware =>
  (req, res, next) => {
    try {
      const token = decodeAndValidateToken(req.headers, isRefreshToken);

      if (token.decodedToken.iss !== "auth")
        throw new Error("Wrong token issuer!");
      if (!token.decodedToken.sid) throw new Error("Token has no session");

      res.locals[isRefreshToken ? "refreshToken" : "token"] = token;
      next();
    } catch (error) {
      if (error instanceof Error)
        res.status(statusCodes.Unauthorized).send({
          message: error.message,
          stack: error.stack,
        });
    }
  };

const decodeAndValidateToken = <T = { authId: string }>(
  { authorization: authorizationHeader }: Request["headers"],
  isRefreshToken = false
) => {
  if (typeof authorizationHeader !== "string")
    throw new Error("No token or token malformed");

  const token = new TokenValidator<T>(
    authorizationHeader.split(" ")[1],
    isRefreshToken
  );

  return token;
};
