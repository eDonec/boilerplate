import ApiSDK from ".";

export default abstract class ServerSDK {
  protected api: ApiSDK["api"];

  protected refreshToken: ApiSDK["refreshToken"];

  protected setBearerToken: ApiSDK["setBearerToken"];

  constructor(api: ApiSDK) {
    if (!(api instanceof ApiSDK))
      throw new Error("Api needs to be inititated with an ApiSDK");
    this.api = api.api;
    this.refreshToken = api.refreshToken;
    this.setBearerToken = api.setBearerToken;
  }
}
