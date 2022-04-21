import ApiSDK from ".";

export default abstract class ServerSDK {
  protected api: ApiSDK["api"];

  protected refreshToken: ApiSDK["refreshToken"];

  protected setBearerToken: ApiSDK["setBearerToken"];

  constructor(api: ApiSDK) {
    this.api = api.api;
    this.refreshToken = api.refreshToken;
    this.setBearerToken = api.setBearerToken;
  }
}
