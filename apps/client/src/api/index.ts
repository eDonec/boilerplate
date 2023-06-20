import AuthSDK from "auth-sdk";
import BlogsSDK from "blogs-sdk";
import CategorySDK from "categories-sdk";
import ApiSDK from "server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);
const blogsSDK = new BlogsSDK(mainApi);
const categorySDK = new CategorySDK(mainApi);

const Api = {
  mainApi,
  authSDK,
  blogsSDK,
  categorySDK,
};

export default Api;
