import { IndexedDb } from "@edonec/indexed-db-class";
import AuthSDK from "auth-sdk";
import HealthSDK from "health-sdk";
import ApiSDK from "server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);
const healthSDK = new HealthSDK(mainApi);
const Api = { mainApi, authSDK, healthSDK };

const db: IndexedDb = new IndexedDb("Auth", [{ tableName: "auth", key: "id" }]);

export { db };

export default Api;
