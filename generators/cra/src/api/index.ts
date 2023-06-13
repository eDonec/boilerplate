import { IndexedDb } from "@edonec/indexed-db-class";
import AuthSDK from "auth-sdk";
import ApiSDK from "server-sdk";

const mainApi = new ApiSDK();
const authSDK = new AuthSDK(mainApi);

const Api = {
  mainApi,
  authSDK,
};

const db: IndexedDb = new IndexedDb("Auth", [{ tableName: "auth", key: "id" }]);

export { db };

export default Api;
