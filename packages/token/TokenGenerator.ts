import { Secret, sign } from "jsonwebtoken";
import "dotenv/config";

import TokenValidator, {
  getTokenSecretKey,
  IDecodedToken,
} from "./TokenValidator";

export default class TokenGenerator<
  T = string | object | Buffer
> extends TokenValidator<T> {
  constructor(
    token: Omit<IDecodedToken<T>, "exp">,
    isRefreshToken = false,
    secret?: Secret,
    exp?: string | number
  ) {
    checkEnvVars();

    const generatedToken = sign(
      token,
      getTokenSecretKey(isRefreshToken, secret),
      {
        expiresIn:
          exp || isRefreshToken
            ? process.env.REFRESH_TOKEN_EXPIRES_IN
            : process.env.TOKEN_EXPIRES_IN,
      }
    );

    super(generatedToken, isRefreshToken, secret);
  }
}

const checkEnvVars = () => {
  if (!process.env.ACCESS_TOKEN_SECRET_KEY)
    throw new Error(
      "access Token secret key is not set please set it up in .env before using this app ACCESS_TOKEN_SECRET_KEY"
    );
  if (!process.env.REFRESH_TOKEN_SECRET_KEY)
    throw new Error(
      "refresh Token secret key is not set please set it up in .env before using this app REFRESH_TOKEN_SECRET_KEY"
    );
  if (!process.env.TOKEN_EXPIRES_IN || !process.env.REFRESH_TOKEN_EXPIRES_IN)
    throw new Error(
      "refresh Token secret key is not set please set it up in .env before using this app TOKEN_EXPIRES_IN || REFRESH_TOKEN_EXPIRES_IN"
    );
};
