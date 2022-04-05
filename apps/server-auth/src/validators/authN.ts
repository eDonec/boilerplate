import CustomInputError from "custom-error/customInputError";
import isAfter from "date-fns/isAfter";
import { Request } from "express";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

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

  validators.validate.email.exists().isString();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
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
        .send({ stack: ` ${__dirname} signInClassicValidator line 26` });

    return;
  }

  return next();
};

export const refreshTokenValidator: IMiddleware = (req, res, next) => {
  try {
    const refreshToken = decodeAndValidateToken<{
      authId: string;
      sessionId: string;
    }>(req.headers, true);

    if (refreshToken.decodedToken.iss !== "server-auth")
      throw new Error("Wrong token issuer!");
    if (isAfter(refreshToken.decodedToken.exp, new Date()))
      throw new Error("Refresh Token expired!");
    if (!refreshToken.decodedToken.payload.sessionId)
      throw new Error("Refresh Token has no session");

    res.locals.refreshToken = refreshToken;
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
