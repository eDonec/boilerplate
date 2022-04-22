/* eslint-disable max-lines */
import { AuthNRouteTypes } from "auth-types/routes/authN";
import CustomInputError from "custom-error/customInputError";
import { Request, Response } from "express";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";
import StatusCodes from "shared-types/StatusCodes";
import TokenValidator from "token/TokenValidator";

export const signUpClassicValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: CustomInputError["fields"];
    name?: string;
  }>
> = (req, res, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString().minLength(8);
  if (userName) validators.validate.userName.isString().minLength(6);

  try {
    validators.resolveErrors();

    return next();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
        fields: error.fields,
        name: error.name,
      });
    else
      res.status(StatusCodes["Internal Server Error"]).send({
        stack: error instanceof Error ? error.stack : "unknown",
        message: error instanceof Error ? error.message : "unknown",
      });
  }
};

export const signInClassicValidator: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"]
  >,
  Response<{
    message: string;
    stack?: string;
    fields?: CustomInputError["fields"];
    name?: string;
  }>
> = (req, res, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
  try {
    validators.resolveErrors();

    return next();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
        fields: error.fields,
        name: error.name,
      });
    else
      res.status(StatusCodes["Internal Server Error"]).send({
        stack: error instanceof Error ? error.stack : "unknown",
        message: error instanceof Error ? error.message : "unknown",
      });
  }
};
export const signInAppleValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: CustomInputError["fields"];
    name?: string;
  }>
> = (req, res, next) => {
  const { familyName, givenName, token } = req.body;
  const validators = new FieldValidator({ familyName, givenName, token });

  validators.validate.token.exists().isString();
  validators.validate.givenName.exists().isString();
  validators.validate.familyName.exists().isString();
  try {
    validators.resolveErrors();

    return next();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
        fields: error.fields,
        name: error.name,
      });
    else
      res.status(StatusCodes["Internal Server Error"]).send({
        stack: error instanceof Error ? error.stack : "unknown",
        message: error instanceof Error ? error.message : "unknown",
      });
  }
};
export const signInFacebookValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: CustomInputError["fields"];
    name?: string;
  }>
> = (req, res, next) => {
  const { token } = req.body;
  const validators = new FieldValidator({ token });

  validators.validate.token.exists().isString();
  try {
    validators.resolveErrors();

    return next();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
        fields: error.fields,
        name: error.name,
      });
    else
      res.status(StatusCodes["Internal Server Error"]).send({
        stack: error instanceof Error ? error.stack : "unknown",
        message: error instanceof Error ? error.message : "unknown",
      });
  }
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
        res.status(StatusCodes.Unauthorized).send({
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
