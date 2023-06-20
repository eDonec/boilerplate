/* eslint-disable max-lines */
import UnauthorizedError from "custom-error/UnauthorizedError";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

import { Request } from "../types";

export const tokenValidator =
  (isRefreshToken = false): IMiddleware =>
  (req, res, next) => {
    const token = decodeAndValidateToken(req.headers, isRefreshToken);

    if (token.decodedToken.iss !== "auth")
      throw new UnauthorizedError({
        message: "Wrong token issuer!",
        reason: "Danger! Issuer is unkown!",
      });
    if (!token.decodedToken.sid)
      throw new UnauthorizedError({
        message: "Token has no session",
        reason: "missing session on token",
      });

    res.locals[isRefreshToken ? "refreshToken" : "token"] = token;
    next();
  };

export const decodeAndValidateToken = <T = { authId: string }>(
  { authorization: authorizationHeader }: Request["headers"],
  isRefreshToken = false
) => {
  if (typeof authorizationHeader !== "string")
    throw new UnauthorizedError({
      message: "No token or token malformed",
      reason: "Token Decoder",
    });

  const token = new TokenValidator<T>(
    authorizationHeader.split(" ")[1],
    isRefreshToken
  );

  return token;
};

export const tokenValidatorOptional: IMiddleware = (req, res, next) => {
  try {
    const token = decodeAndValidateToken(req.headers);

    if (token.decodedToken.iss !== "auth")
      throw new UnauthorizedError({
        message: "Wrong token issuer!",
        reason: "Danger! Issuer is unkown!",
      });
    if (!token.decodedToken.sid)
      throw new UnauthorizedError({
        message: "Token has no session",
        reason: "missing session on token",
      });
    res.locals.token = token;
  } catch (error) {
    res.locals.token = null;
  }
  next();
};
