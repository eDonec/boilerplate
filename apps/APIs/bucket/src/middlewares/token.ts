import UnauthorizedError from "custom-error/UnauthorizedError";
import { Request } from "http-server";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

export const tokenValidator: IMiddleware = (req, res, next) => {
  const { decodedToken } = decodeAndValidateToken<{ mimeTypes: string[] }>(
    req.headers
  );

  if (decodedToken.iss !== "auth")
    throw new UnauthorizedError({
      message: "Wrong token issuer!",
      reason: "Danger! Issuer is unkown!",
    });

  res.locals.mimeTypes = decodedToken.payload.mimeTypes;

  next();
};

const decodeAndValidateToken = <T = { authId: string }>({
  authorization: authorizationHeader,
}: Request["headers"]) => {
  if (typeof authorizationHeader !== "string")
    throw new UnauthorizedError({
      message: "No token or token malformed",
      reason: "Token Decoder",
    });

  const token = new TokenValidator<T>(
    authorizationHeader.split(" ")[1],
    false,
    process.env.UPLOAD_SECRET_KEY
  );

  return token;
};
