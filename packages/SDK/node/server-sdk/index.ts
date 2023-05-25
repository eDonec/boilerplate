import { AuthNRouteTypes } from "auth-types/routes/authN";
import axios, { AxiosError, AxiosInstance } from "axios";
import StatusCodes from "shared-types/StatusCodes";

const DEFAULT_BASE_URL =
  process.env.NODE_ENV === "production"
    ? //!STARTERCONF change this to your production API URL
    `https://test.example.com/api`
    : "http://localhost:3007/api";

type ResetTokenCallback = (
  setBearerToken: (token: string | null) => ApiSDK,
  refreshToken?: string
) => void;
export default class ApiSDK {
  public refreshToken: string | null = null;

  public api: AxiosInstance;

  public resetTokensCallbacks: ResetTokenCallback[] = [];

  private onAccessTokenChange?: (token: string | null) => void;

  constructor(
    baseURL: string = DEFAULT_BASE_URL,
    accessToken?: string,
    refreshToken?: string
  ) {
    this.api = axios.create({
      baseURL,
    });
    this.initOrReInit(accessToken, refreshToken);
  }

  setOnAccessTokenChange(cb: (token: string | null) => void) {
    this.onAccessTokenChange = cb;
  }

  initOrReInit(accessToken?: string, refreshToken?: string) {
    if (accessToken) this.setBearerToken(accessToken);
    if (refreshToken) this.refreshToken = refreshToken;
    this.resetTokensCallbacks.forEach((cb) =>
      cb(this.setBearerToken, refreshToken)
    );
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;

        if (
          !request.url.includes("/z/refresh-token") &&
          error.response?.status === StatusCodes.Forbidden &&
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

  async refreshUserToken() {
    if (!this.refreshToken) throw new Error("No refresh token");
    const { data } = await this.api.get<
      AuthNRouteTypes["/z/refresh-token"]["GET"]["response"]
    >("/v1/auth/z/refresh-token", {
      headers: { Authorization: `Bearer ${this.refreshToken}` },
    });

    this.onAccessTokenChange?.(data);
    this.setBearerToken(data);
  }

  public setBearerToken(token: string | null) {
    if (token)
      this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
    else delete this.api.defaults.headers.common.Authorization;

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isApiError = <T = unknown, D = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is AxiosError<T, D> => {
  if (error instanceof AxiosError) return true;

  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ServerError<T = unknown, D = any> = AxiosError<T, D>;
