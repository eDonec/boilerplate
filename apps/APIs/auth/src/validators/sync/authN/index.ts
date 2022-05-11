/* eslint-disable max-lines */
import { AuthNRouteTypes } from "auth-types/routes/authN";
import ObjectValidationError from "custom-error/ObjectValidationError";
import middlewareWithTryCatch from "errors/middlewareWithTryCatch";
import { Request, Response } from "express";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

export const signUpClassicValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = middlewareWithTryCatch((req, _, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString().minLength(8);
  if (userName) validators.validate.userName.isString().minLength(6);

  validators.resolveErrors();

  return next();
});

export const signInClassicValidator: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"]
  >,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = middlewareWithTryCatch((req, _, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
  validators.resolveErrors();

  return next();
});
export const signInAppleValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = middlewareWithTryCatch((req, _, next) => {
  const { familyName, givenName, token } = req.body;
  const validators = new FieldValidator({ familyName, givenName, token });

  validators.validate.token.exists().isString();
  validators.validate.givenName.exists().isString();
  validators.validate.familyName.exists().isString();
  validators.resolveErrors();

  return next();
});
export const signInFacebookValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = (req, _, next) => {
  const { token } = req.body;
  const validators = new FieldValidator({ token });

  validators.validate.token.exists().isString();
  validators.resolveErrors();

  return next();
};

export const tokenValidator = (isRefreshToken = false): IMiddleware =>
  middlewareWithTryCatch((req, res, next) => {
    const token = decodeAndValidateToken(req.headers, isRefreshToken);

    if (token.decodedToken.iss !== "auth")
      throw new Error("Wrong token issuer!");
    if (!token.decodedToken.sid) throw new Error("Token has no session");

    res.locals[isRefreshToken ? "refreshToken" : "token"] = token;
    next();
  });

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
