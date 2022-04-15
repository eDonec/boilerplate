import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
import StatusCodes from "shared-types/StatusCodes";
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

  try {
    if (!authUsersByRefreshToken)
      throw new Error("User not found refresh token is invalid!");
    if (
      !authUsersByRefreshToken.sessions.includes(refreshToken.decodedToken.sid)
    )
      throw new Error(
        "User session cannot be found he is probably disconnected"
      );
    res.locals.currentAuth = authUsersByRefreshToken;
    next();
  } catch (error) {
    if (error instanceof Error)
      res.status(StatusCodes.Unauthorized).send({
        message: error.message,
        stack: error.stack,
      });
  }
};
