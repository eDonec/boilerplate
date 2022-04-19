import { ResponseTypes } from "auth-types/routes/authNRoutes";
import CustomInputError from "custom-error/customInputError";
import { Request } from "express";
import FieldValidator from "field-validator";
import { IMiddleware } from "shared-types";
import StatusCodes from "shared-types/StatusCodes";
import TokenValidator from "token/TokenValidator";

export const signUpClassicValidator: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/classic"]["POST"]["body"]>
> = (req, res, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString().isEmail();
  validators.validate.password.exists().isString().minLength(8);
  if (userName) validators.validate.userName.isString().minLength(6);

  try {
    validators.resolveErrors();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator auth",
        fields: error.fields,
        name: error.name,
      });
    else
      res
        .status(StatusCodes["Internal Server Error"])
        .send({ stack: ` ${__dirname} signUpClassicValidator line 26` });

    return;
  }

  return next();
};

export const signInClassicValidator: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/sign-in/classic"]["POST"]["body"]>
> = (req, res, next) => {
  const { email, password, userName } = req.body;
  const validators = new FieldValidator({ email, password, userName });

  validators.validate.email.exists().isString();
  validators.validate.password.exists().isString();
  if (userName) validators.validate.userName.isString();
  try {
    validators.resolveErrors();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator auth",
        fields: error.fields,
        name: error.name,
      });
    else
      res
        .status(StatusCodes["Internal Server Error"])
        .send({ stack: ` ${__dirname} signInClassicValidator line 26` });

    return;
  }

  return next();
};
export const signInAppleValidator: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/apple"]["POST"]["body"]>
> = (req, res, next) => {
  const { familyName, givenName, token } = req.body;
  const validators = new FieldValidator({ familyName, givenName, token });

  validators.validate.token.exists().isString();
  validators.validate.givenName.exists().isString();
  validators.validate.familyName.exists().isString();
  try {
    validators.resolveErrors();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator auth",
        fields: error.fields,
        name: error.name,
      });
    else
      res
        .status(StatusCodes["Internal Server Error"])
        .send({ stack: ` ${__dirname} signInClassicValidator line 26` });

    return;
  }

  return next();
};
export const signInFacebookValidator: IMiddleware<
  Request<unknown, unknown, ResponseTypes["/n/facebook"]["POST"]["body"]>
> = (req, res, next) => {
  const { token } = req.body;
  const validators = new FieldValidator({ token });

  validators.validate.token.exists().isString();
  try {
    validators.resolveErrors();
  } catch (error) {
    if (error instanceof CustomInputError)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: "authentication validator auth",
        fields: error.fields,
        name: error.name,
      });
    else
      res
        .status(StatusCodes["Internal Server Error"])
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
