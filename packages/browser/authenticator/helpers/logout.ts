import LocalAuthApi, { authIndexedDb, localStorageClass } from "../api";
import { INDEXED_DB_TABLE_NAME, LOCALSTORAGE_KEY } from "../constants";

export const logout = async () => {
  try {
    await LocalAuthApi.authSDK?.logout();
  } catch (error) {
    // TODO: Handle error
    // toast.error("already logged out");
  }
  localStorageClass.removeItem(LOCALSTORAGE_KEY);
  // TODO: Get the authId from somewhere
  authIndexedDb.db?.deleteData(INDEXED_DB_TABLE_NAME, "");
};
