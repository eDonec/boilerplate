import { AuthNRouteTypes } from "auth-types/routes/authN";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { ClientRouteTypes } from "auth-types/routes/client";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";
import { IToken } from "shared-types";

const baseUrl = "/v1/auth";

export default class AuthSDK extends ServerSDK {
  public async signUpClassic({
    body,
  }: {
    body: AuthNRouteTypes["/n/classic"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthNRouteTypes["/n/classic"]["POST"]["response"]
    >(`${baseUrl}/n/classic`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async signInClassic({
    body,
    query,
  }: {
    body: AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"];
    query?: AuthNRouteTypes["/n/sign-in/classic"]["POST"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthNRouteTypes["/n/sign-in/classic"]["POST"]["response"]
    >(`${baseUrl}/n/sign-in/classic`, body, { params: query });

    this.handleAuthResponse(data.token);

    return data;
  }

  public async appleSignIn({
    body,
  }: {
    body: AuthNRouteTypes["/n/apple"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthNRouteTypes["/n/apple"]["POST"]["response"]
    >(`${baseUrl}/n/apple`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async facebookSignIn({
    body,
  }: {
    body: AuthNRouteTypes["/n/facebook"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthNRouteTypes["/n/facebook"]["POST"]["response"]
    >(`${baseUrl}/n/facebook`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async logout() {
    if (!this.refreshToken) throw new Error("No refresh token");
    await this.api.get<AuthNRouteTypes["/n/logout"]["GET"]["response"]>(
      `${baseUrl}/n/logout`,
      {
        headers: { Authorization: `Bearer ${this.refreshToken}` },
      }
    );

    this.setBearerToken(null);
    this.refreshToken = null;
  }

  public async getUploadToken({
    query,
  }: {
    body?: never;
    query: AuthNRouteTypes["/z/upload-token"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      AuthNRouteTypes["/z/upload-token"]["GET"]["response"]
    >(`${baseUrl}/z/upload-token`, { params: query });

    return data;
  }

  public isLoggedIn() {
    return !!this.refreshToken;
  }

  private handleAuthResponse(token: IToken) {
    this.setBearerToken(token.accessToken);
    this.refreshToken = token.refreshToken;
  }

  public async getAuthByAccessToken() {
    const { data } = await this.api.get<
      AuthNRouteTypes["/n/me"]["GET"]["response"]
    >(`${baseUrl}/n/me`);

    return data;
  }

  public async checkRessourceAccess({
    body,
  }: {
    body: AuthZRouteTypes["/z/ressource-access"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthZRouteTypes["/z/ressource-access"]["POST"]["response"]
    >(`${baseUrl}/z/ressource-access`, body);

    return data;
  }

  public async getRoles({
    query,
  }: {
    body?: never;
    query: AuthZRouteTypes["/z/roles"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      AuthZRouteTypes["/z/roles"]["GET"]["response"]
    >(`${baseUrl}/z/roles`, { params: query });

    return data;
  }

  public async getAuthenticatedClients({
    query,
  }: {
    body?: never;
    query: ClientRouteTypes["/clients/"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      ClientRouteTypes["/clients/"]["GET"]["response"]
    >(`${baseUrl}/clients`, { params: query });

    return data;
  }
}

export type AuthSDKTypes = ServerSDKTypes<AuthSDK>;
