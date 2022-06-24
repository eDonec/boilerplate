import { Secret, sign } from "jsonwebtoken";
import { stringify } from "zipson/lib";
import "dotenv/config";

import TokenValidator, {
  getTokenSecretKey,
  IDecodedToken,
} from "./TokenValidator";

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

export default class TokenGenerator<
  T = string | object | Buffer
> extends TokenValidator<T> {
  constructor(
    token: Omit<IDecodedToken<T>, "exp">,
    isRefreshToken = false,
    secret?: Secret,
    exp?: string | number
  ) {
    const generatedToken = sign(
      { ...token, payload: stringify(token.payload) },
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
