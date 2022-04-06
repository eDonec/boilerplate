import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
import TokenValidator from "token/TokenValidator";

import { statusCodes } from "constants/statusCodes";

export const findAndValidateAuthClientByRefreshToken: IMiddleware = async (
  req,
  res,
  next
) => {
  const { refreshToken } = res.locals as {
    refreshToken: TokenValidator<{ authId: string; sessionId: string }>;
  };
  const authUsersByRefreshToken = await Auth.findById(
    refreshToken.decodedToken.payload.authId
  );

  try {
    if (!authUsersByRefreshToken)
      throw new Error("User not found refresh token is invalid!");
    if (
      !authUsersByRefreshToken.sessions.includes(
        refreshToken.decodedToken.payload.sessionId
      )
    )
      throw new Error(
        "User session cannot be found he is probably disconnected"
      );
    res.locals.currentAuth = authUsersByRefreshToken;
    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(statusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
      });
  }
};
