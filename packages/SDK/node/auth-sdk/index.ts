/* eslint-disable max-lines */
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { RolesRouteTypes } from "auth-types/routes/roles";
import { UserRouteTypes } from "auth-types/routes/user";
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

  public async getAuthByAccessToken(signal?: AbortSignal) {
    const { data } = await this.api.get<
      AuthNRouteTypes["/n/me"]["GET"]["response"]
    >(`${baseUrl}/n/me`, {
      signal,
    });

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
    query: RolesRouteTypes["/roles/"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      RolesRouteTypes["/roles/"]["GET"]["response"]
    >(`${baseUrl}/roles`, { params: query });

    return data;
  }

  public async getRoleById({
    params,
  }: {
    body?: never;
    query?: never;
    params: RolesRouteTypes["/roles/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      RolesRouteTypes["/roles/:id"]["GET"]["response"]
    >(`${baseUrl}/roles/${params.id}`);

    return data;
  }

  public async banClient({
    body,
    params,
  }: {
    body: AuthZRouteTypes["/z/ban-client/:id"]["POST"]["body"];
    query?: never;
    params: AuthZRouteTypes["/z/ban-client/:id"]["POST"]["params"];
  }) {
    const { data } = await this.api.post<
      AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]
    >(`${baseUrl}/z/ban-client/${params.id}`, body);

    return data;
  }

  public async updateRole({
    body,
    params,
  }: {
    body: RolesRouteTypes["/roles/:id"]["PUT"]["body"];
    query?: never;
    params: RolesRouteTypes["/roles/:id"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      RolesRouteTypes["/roles/:id"]["PUT"]["response"]
    >(`${baseUrl}/roles/${params.id}`, body);

    return data;
  }

  public async suspendClient({
    body,
    params,
  }: {
    body: AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["body"];
    query?: never;
    params: AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["params"];
  }) {
    const { data } = await this.api.post<
      AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"]
    >(`${baseUrl}/z/suspend-client/${params.id}`, body);

    return data;
  }

  public async liftBanAndSuspension({
    params,
  }: {
    body?: never;
    query?: never;
    params: AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]
    >(`${baseUrl}/z/lift-ban-suspension/${params.id}`);

    return data;
  }

  public async addRole({
    body,
  }: {
    body: RolesRouteTypes["/roles/"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      RolesRouteTypes["/roles/"]["POST"]["response"]
    >(`${baseUrl}/roles/`, body);

    return data;
  }

  public async deleteRole({
    params,
  }: {
    body?: never;
    query?: never;
    params: RolesRouteTypes["/roles/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      RolesRouteTypes["/roles/:id"]["DELETE"]["response"]
    >(`${baseUrl}/roles/${params.id}`);

    return data;
  }

  public async getGrantableRoles({
    params,
  }: {
    body?: never;
    query?: never;
    params: RolesRouteTypes["/roles/grantable/:authId"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      RolesRouteTypes["/roles/grantable/:authId"]["GET"]["response"]
    >(`${baseUrl}/roles/grantable/${params.authId}`);

    return data;
  }

  public async updateClientAccess({
    body,
    params,
  }: {
    body: AuthZRouteTypes["/z/access/:id"]["PUT"]["body"];
    query?: never;
    params: AuthZRouteTypes["/z/access/:id"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      AuthZRouteTypes["/z/access/:id"]["PUT"]["response"]
    >(`${baseUrl}/z/access/${params.id}`, body);

    return data;
  }

  public async googleSignIn({
    body,
  }: {
    body: AuthNRouteTypes["/n/google"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      AuthNRouteTypes["/n/google"]["POST"]["response"]
    >(`${baseUrl}/n/google`, body);

    this.handleAuthResponse(data.token);

    return data;
  }

  public async updateUser({
    body,
    params,
  }: {
    body: UserRouteTypes["/user/:authID"]["PUT"]["body"];
    query?: never;
    params: UserRouteTypes["/user/:authID"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      UserRouteTypes["/user/:authID"]["PUT"]["response"]
    >(`${baseUrl}/user/${params.authID}`, body);

    return data;
  }

  public async getUser({
    params,
  }: {
    body?: never;
    query?: never;
    params: UserRouteTypes["/user/:authID"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/user/:authID"]["GET"]["response"]
    >(`${baseUrl}/user/${params.authID}`);

    return data;
  }

  public async getUsers({
    query,
  }: {
    body?: never;
    query: UserRouteTypes["/user/"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/user/"]["GET"]["response"]
    >(`${baseUrl}/user/`, { params: query });

    return data;
  }

  public async updateSelf({
    body,
  }: {
    body: UserRouteTypes["/user/me"]["PUT"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.put<
      UserRouteTypes["/user/me"]["PUT"]["response"]
    >(`${baseUrl}/user/me`, body);

    return data;
  }

  public async updatePassword({
    body,
  }: {
    body: AuthNRouteTypes["/n/update-password"]["PUT"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.put<
      AuthNRouteTypes["/n/update-password"]["PUT"]["response"]
    >(`${baseUrl}/n/update-password`, body);

    return data;
  }

  public async resetPassword({
    body,
  }: {
    body: AuthNRouteTypes["/n/reset-password"]["PUT"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.put<
      AuthNRouteTypes["/n/reset-password"]["PUT"]["response"]
    >(`${baseUrl}/n/reset-password`, body);

    return data;
  }

  public async resetPasswordConfirm({
    body,
    query,
  }: {
    body: AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["body"];
    query: AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.put<
      AuthNRouteTypes["/n/reset-password-confirm"]["PUT"]["response"]
    >(`${baseUrl}/n/reset-password-confirm`, body, { params: query });

    return data;
  }

  public async getUnpaginatedMinimalUsers(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/user/unpaginated-minimal-users"]["GET"]["response"]
    >(`${baseUrl}/user/unpaginated-minimal-users`);

    return data;
  }

  public async isPhoneNumberAvailable({
    query,
  }: {
    body?: never;
    query: UserRouteTypes["/user/is-phonenumber-available"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      UserRouteTypes["/user/is-phonenumber-available"]["GET"]["response"]
    >(`${baseUrl}/user/is-phonenumber-available`, { params: query });

    return data;
  }
}

export type AuthSDKTypes = ServerSDKTypes<AuthSDK>;
