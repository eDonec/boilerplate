import { IndexedDb } from "@edonec/indexed-db-class";
import AuthSDK from "auth-sdk";
import BlogsSDK from "blogs-sdk";
import CategoriesSDK from "categories-sdk";
import HealthSDK from "health-sdk";
import ApiSDK from "server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);
const healthSDK = new HealthSDK(mainApi);
const blogsSDK = new BlogsSDK(mainApi);
const categoriesSDK = new CategoriesSDK(mainApi);

const Api = {
  mainApi,
  authSDK,
  healthSDK,
  blogsSDK,
  categoriesSDK,
};

const db: IndexedDb = new IndexedDb("DashboardAuth", [
  { tableName: "auth", key: "id" },
]);

export { db };

export default Api;
