/* eslint-disable max-lines */
import { AuthNRouteTypes } from "auth-types/routes/authN";
import ObjectValidationError from "custom-error/ObjectValidationError";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const signUpClassicValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/classic"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = (req, _, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString().minLength(8);
  if (userName) validators.validate.userName.isString().minLength(6);

  validators.resolveErrors();

  return next();
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
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = (req, _, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
  validators.resolveErrors();

  return next();
};
export const signInAppleValidator: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<{
    message: string;
    stack?: string;
    fields?: ObjectValidationError["fields"];
    name?: string;
  }>
> = (req, _, next) => {
  const { familyName, givenName, token } = req.body;
  const validators = new FieldValidator({ familyName, givenName, token });

  validators.validate.token.exists().isString();
  validators.validate.givenName.exists().isString();
  validators.validate.familyName.exists().isString();
  validators.resolveErrors();

  return next();
};
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

export * from "http-server/middlewares/authN";
