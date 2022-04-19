import { RouteTypes } from "auth-types/routes/authNRoutes";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";
import { IToken } from "shared-types";

const baseUrl = "/v1/auth";

export default class AuthSDK extends ServerSDK {
  public async signUpClassic({
    body,
  }: {
    body: RouteTypes["/n/classic"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      RouteTypes["/n/classic"]["POST"]["response"]
    >(`${baseUrl}/n/classic`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async signInClassic({
    body,
    query,
  }: {
    body: RouteTypes["/n/sign-in/classic"]["POST"]["body"];
    query?: RouteTypes["/n/sign-in/classic"]["POST"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.post<
      RouteTypes["/n/sign-in/classic"]["POST"]["response"]
    >(`${baseUrl}/n/sign-in/classic`, body, { params: query });

    this.handleAuthResponse(data.token);

    return data;
  }

  public async appleSignIn({
    body,
  }: {
    body: RouteTypes["/n/apple"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      RouteTypes["/n/apple"]["POST"]["response"]
    >(`${baseUrl}/n/apple`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async facebookSignIn({
    body,
  }: {
    body: RouteTypes["/n/facebook"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      RouteTypes["/n/facebook"]["POST"]["response"]
    >(`${baseUrl}/n/facebook`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async logout() {
    if (!this.refreshToken) throw new Error("No refresh token");
    await this.api.get<RouteTypes["/n/logout"]["GET"]["response"]>(
      `${baseUrl}/n/logout`,
      {
        headers: { Authorization: `Bearer ${this.refreshToken}` },
      }
    );

    this.setBearerToken(null);
    this.refreshToken = null;
  }

  public isLoggedIn() {
    return !!this.refreshToken;
  }

  private handleAuthResponse(token: IToken) {
    this.setBearerToken(token.accessToken);
    this.refreshToken = token.refreshToken;
  }
}

export type AuthSDKTypes = ServerSDKTypes<AuthSDK>;
