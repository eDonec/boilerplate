import AuthSDK from "auth-sdk";
import ApiSDK from "server-sdk";

class AuthApiClass {
  _authSDK: AuthSDK | undefined;

  _mainApi: ApiSDK | undefined;

  init(mainApi: ApiSDK) {
    this._authSDK = new AuthSDK(mainApi);
    this._mainApi = mainApi;
  }

  get authSDK() {
    if (!this._authSDK) throw new Error("AuthSDK not initialized");

    return this._authSDK;
  }

  get mainApi() {
    if (!this._mainApi) throw new Error("AuthSDK not initialized");

    return this._mainApi;
  }
}

export default AuthApiClass;
