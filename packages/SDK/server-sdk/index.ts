import { statusCodes } from "auth/src/constants/statusCodes";
import axios, { AxiosInstance } from "axios";

export default abstract class ServerSDK {
  protected refreshToken: string | null = null;

  protected api: AxiosInstance;

  constructor(apiPrefix: string, accessToken?: string, refreshToken?: string) {
    this.api = axios.create({
      baseURL: `/api${apiPrefix}`,
    });

    if (accessToken) this.setBearerToken(accessToken);
    if (refreshToken) this.refreshToken = refreshToken;

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;

        if (
          error.response?.status === statusCodes.Unauthorized &&
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
    const { data } = await this.api.get<string>("/n/refresh-token", {
      headers: { Authorization: `Bearer ${this.refreshToken}` },
    });

    this.setBearerToken(data);
  }

  protected setBearerToken(token: string | null) {
    if (token)
      this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete this.api.defaults.headers.common.Authorization;

    return this;
  }
}
