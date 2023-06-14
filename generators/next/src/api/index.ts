import AuthSDK from "auth-sdk";
import ApiSDK from "server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);

const Api = {
  mainApi,
  authSDK,
};

export default Api;
