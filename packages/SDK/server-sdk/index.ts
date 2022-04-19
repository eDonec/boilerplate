import { ResponseTypes } from "auth-types/routes/authNRoutes";
import axios, { AxiosInstance } from "axios";
import StatusCodes from "shared-types/StatusCodes";

export default class ApiSDK {
  public refreshToken: string | null = null;

  public api: AxiosInstance;

  constructor(accessToken?: string, refreshToken?: string) {
    this.api = axios.create({
      baseURL: `/api`,
    });

    if (accessToken) this.setBearerToken(accessToken);
    if (refreshToken) this.refreshToken = refreshToken;

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;

        if (
          error.response?.status === StatusCodes.Unauthorized &&
          error.response.data.message === "Token invalid or expired" &&
          !request._retry
        ) {
          request._retry = true;
          await this.refreshUserToken();
          request.headers.Authorization =
            this.api.defaults.headers.common.Authorization;

          return this.api(request);
        }

        return Promise.reject(error);
      }
    );
  }

  private async refreshUserToken() {
    if (!this.refreshToken) throw new Error("No refresh token");
    const { data } = await this.api.get<
      ResponseTypes["/n/refresh-token"]["GET"]["response"]
    >("/n/refresh-token", {
      headers: { Authorization: `Bearer ${this.refreshToken}` },
    });

    this.setBearerToken(data);
  }

  public setBearerToken(token: string | null) {
    if (token)
      this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete this.api.defaults.headers.common.Authorization;

    return this;
  }
}
