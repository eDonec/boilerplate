import ApiSDK from "./index";

export default abstract class ServerSDK {
  protected api: ApiSDK["api"];

  protected refreshToken: ApiSDK["refreshToken"];

  protected setBearerToken: ApiSDK["setBearerToken"];

  constructor(api: ApiSDK) {
    if (!(api instanceof ApiSDK))
      throw new Error("Api needs to be inititated with an ApiSDK");
    this.api = api.api;
    api.resetTokensCallbacks.push(this.resetTokens);
    this.refreshToken = api.refreshToken;
    this.setBearerToken = api.setBearerToken;
  }

  private resetTokens = (
    setBearerToken: (token: string | null) => ApiSDK,
    refreshToken?: string
  ) => {
    this.setBearerToken = setBearerToken;
    this.refreshToken = refreshToken || "";
  };
}
