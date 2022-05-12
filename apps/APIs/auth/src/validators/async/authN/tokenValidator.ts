import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
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
  ).populate("role");

  if (!authUsersByRefreshToken)
    throw new Error("User not found refresh token is invalid!");
  if (!authUsersByRefreshToken.sessions.includes(refreshToken.decodedToken.sid))
    throw new Error("User session cannot be found he is probably disconnected");
  res.locals.currentAuth = authUsersByRefreshToken;
  next();
};
