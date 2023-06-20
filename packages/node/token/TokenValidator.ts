/* eslint-disable @typescript-eslint/no-non-null-assertion */
import UnauthorizedError from "custom-error/UnauthorizedError";
import { decode, Secret, verify } from "jsonwebtoken";
import { parse } from "zipson/lib";
import "dotenv/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDecodedToken<
  T = {
    authId: string;
  }
> {
  iss: string;
  aud: string | string[];
  sid: string;
  exp: number;
  payload: T;
}
export default class TokenValidator<T = string | object | Buffer> {
  token!: string;

  decodedToken!: IDecodedToken<T>;

  private reason?: string;

  protected TOKEN_SECRET_KEY: string | Secret;

  constructor(token: string, isRefreshToken = false, secret?: Secret) {
    this.TOKEN_SECRET_KEY = getTokenSecretKey(isRefreshToken, secret);

    if (!token)
      throw new Error("Please Provide a token to the token constructor");
    if (isRefreshToken && !process.env.REFRESH_TOKEN_SECRET_KEY)
      throw new Error(
        "refresh Token secret key is not set please set it up in .env before using this app"
      );
    if (!isRefreshToken && !secret && !process.env.ACCESS_TOKEN_SECRET_KEY)
      throw new Error(
        "access Token secret key is not set please set it up in .env before using this app"
      );

    if (typeof token !== "string")
      throw new UnauthorizedError({
        message: "Token invalid or expired",
        reason: this.reason || "Token validation",
      });
    if (!this.validate(token)) {
      throw new UnauthorizedError({
        message: "Token invalid or expired",
        reason: this.reason || "Token validation",
      });
    }
    this.token = token;

    this.decodedToken = this.desirializeToken(this.token);
  }

  public desirializeToken(token?: string) {
    const zippedToken = decode(token || this.token) as IDecodedToken<T> & {
      payload: string;
    };

    this.decodedToken = { ...zippedToken, payload: parse(zippedToken.payload) };

    return this.decodedToken;
  }

  public validateIssuerAndProvider({
    iss,
    aud,
  }: Pick<IDecodedToken, "iss" | "aud">) {
    if (!this.validate()) return false;
    if (iss !== this.decodedToken.iss) return false;
    if (aud !== this.decodedToken.aud) return false;

    return true;
  }

  public validate(token?: string) {
    try {
      verify(token || this.token, this.TOKEN_SECRET_KEY);

      return true;
    } catch (error) {
      this.reason = error instanceof Error ? error.message : undefined;

      return false;
    }
  }
}

export const getTokenSecretKey = (isRefreshToken = false, secret?: Secret) => {
  if (isRefreshToken) return process.env.REFRESH_TOKEN_SECRET_KEY!;

  return secret || process.env.ACCESS_TOKEN_SECRET_KEY!;
};
