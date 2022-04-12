import { RoleType } from "auth/src/models/Role/types";
import { ISignUpClassicBody } from "auth/src/types/authNRoutes";
import ServerSDK from "server-sdk";
import { ACCESS } from "shared-types";

type AuthResponse = {
  authID: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
  role: RoleType;
  access: ACCESS[];
};

export default class AuthSDK extends ServerSDK {
  constructor(accessToken?: string, refreshToken?: string) {
    super("/v1/auth", accessToken, refreshToken);
  }

  public async signUpClassic(body: ISignUpClassicBody) {
    const { data } = await this.api.post<AuthResponse>("/n/classic", body);

    this.handleAuthResponse(data);

    return data;
  }

  public async signInClassic(body: ISignUpClassicBody, role?: string) {
    const { data } = await this.api.post<AuthResponse>(
      "/n/sign-in/classic",
      body,
      { params: { role } }
    );

    this.handleAuthResponse(data);

    return data;
  }

  public async logout() {
    if (!this.refreshToken) throw new Error("No refresh token");
    await this.api.get("/n/logout", {
      headers: { Authorization: `Bearer ${this.refreshToken}` },
    });

    this.setBearerToken(null);
    this.refreshToken = null;
  }

  public isLoggedIn() {
    return !!this.refreshToken;
  }

  private handleAuthResponse(authResponse: AuthResponse) {
    this.setBearerToken(authResponse.token.accessToken);
    this.refreshToken = authResponse.token.refreshToken;
  }
}
