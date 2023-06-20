import AuthApiClass from "./AuthApiClass";
import AuthIndexedDb from "./AuthIndexedDb";
import LocalStorageClass from "./LocalStorageClass";

export const authSDKClass = new AuthApiClass();
export const authIndexedDb = new AuthIndexedDb();
export const localStorageClass = new LocalStorageClass();

const LocalAuthApi = authSDKClass;

export default LocalAuthApi;
