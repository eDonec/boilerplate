import { AuthDocument } from "auth-types/models/Auth";
import { NotFoundError } from "custom-error";
import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
import { TCurrentAuthLocals } from "token";
import TokenValidator from "token/TokenValidator";

export const findAndValidateAuthClientByRefreshToken: IMiddleware = async (
  _req,
  res,
  next
) => {
  const { refreshToken } = res.locals as {
    refreshToken: TokenValidator<{ authId: string }>;
  };
  const authUsersByRefreshToken = await Auth.findById(
    refreshToken.decodedToken.payload.authId
  );

  if (!authUsersByRefreshToken)
    throw new NotFoundError({
      message: "User not found or refresh token is invalid!",
      ressource: "User",
    });
  if (!authUsersByRefreshToken.sessions.includes(refreshToken.decodedToken.sid))
    throw new NotFoundError({
      message: "User session cannot be found he is probably disconnected",
      ressource: "User",
    });
  res.locals.currentAuth = authUsersByRefreshToken;
  next();
};

export const findAndValidateAuthClientByAccessToken: IMiddleware = async (
  _req,
  res,
  next
) => {
  const { token } = res.locals as TCurrentAuthLocals & {
    currentAuth?: AuthDocument;
  };
  const maybeAuth = await Auth.findById(token.decodedToken.payload.authId);

  if (!maybeAuth)
    throw new NotFoundError({
      message: "User not found or refresh token is invalid!",
      ressource: "User",
    });

  res.locals.currentAuth = maybeAuth;
  next();
};
