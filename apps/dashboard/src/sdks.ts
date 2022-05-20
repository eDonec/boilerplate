import AuthSDK from "auth-sdk";
import ApiSDK from "server-sdk";

const api = new ApiSDK();
const authSDK = new AuthSDK(api);

export { authSDK };
