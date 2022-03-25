import { Secret, sign, SignOptions, verify } from "jsonwebtoken";

export const isAccessTokenStillValid = (token: string) => {
  try {
    verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || "", (error) => {
      if (error && error.name === "TokenExpiredError")
        throw new Error("Token expired");

      return true;
    });

    return true;
  } catch (error) {
    return false;
  }
};
export const createToken = (id: string, secret: Secret, isExpireble = true) =>
  sign(
    { id },
    secret,
    isExpireble
      ? ({
          expiresIn: process.env.TOKEN_EXPIRES_IN,
        } as SignOptions)
      : undefined
  );
export const createAccessToken = (id: string, sessionId: string) =>
  sign({ id, sessionId }, process.env.ACCESS_TOKEN_SECRET_KEY as string, {
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  });
export const createRefreshToken = (id: string, sessionId: string) =>
  sign({ id, sessionId }, process.env.REFRESH_TOKEN_SECRET_KEY as string);
