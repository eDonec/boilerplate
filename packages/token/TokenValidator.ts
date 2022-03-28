/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { decode, Secret, verify } from "jsonwebtoken";
import "dotenv/config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDecodedToken<T = any> {
  iss: string;
  aud: string | string[];
  sid: string;
  exp?: number;
  payload: T;
}
export default class TokenValidator<T = string | object | Buffer> {
  token!: string;

  decodedToken!: IDecodedToken<T>;

  protected TOKEN_SECRET_KEY: string | Secret;

  constructor(token: string, isRefreshToken = false, secret?: Secret) {
    checkEnvVars();

    this.TOKEN_SECRET_KEY = getTokenSecretKey(isRefreshToken, secret);

    if (!token)
      throw new Error("Please Provide a token to the token constructor");

    if (typeof token !== "string") throw new Error("Token invalid or expired");
    if (!this.validate(token)) throw new Error("Token invalid or expired");
    this.token = token;

    this.decodedToken = this.desirializeToken(this.token);
  }

  public desirializeToken(token?: string) {
    this.decodedToken = decode(token || this.token) as IDecodedToken;

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
      return false;
    }
  }
}
const checkEnvVars = () => {
  if (!process.env.ACCESS_TOKEN_SECRET_KEY)
    throw new Error(
      "access Token secret key is not set please set it up in .env before using this app"
    );
};

export const getTokenSecretKey = (isRefreshToken = false, secret?: Secret) => {
  checkEnvVars();
  if (isRefreshToken) return process.env.REFRESH_TOKEN_SECRET_KEY!;

  return secret || process.env.ACCESS_TOKEN_SECRET_KEY!;
};
