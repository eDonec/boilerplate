import LocalAuthApi, { authIndexedDb, localStorageClass } from "../api";
import { LOCALSTORAGE_KEY } from "../constants";
import {
  clearAuthClient,
  persistAuthClient,
} from "../helpers/persistOrClearAuthClient";
import { IIndexedDBAuthData } from "../types";

export const checkSignInStatus = async () => {
  if (!LocalAuthApi.mainApi || !LocalAuthApi.authSDK)
    return { isLoggedIn: false, authClient: undefined };
  const authId = localStorageClass.getItem(LOCALSTORAGE_KEY);

  if (!authId) return { isLoggedIn: false };

  let authData: IIndexedDBAuthData | undefined;

  try {
    authData = await authIndexedDb.db?.getData("auth", authId);
  } catch (error) {
    return { isLoggedIn: false, authClient: undefined };
  }

  if (!authData) return { isLoggedIn: false, authClient: undefined };

  LocalAuthApi.mainApi.initOrReInit(
    authData.token.accessToken,
    authData.token.refreshToken
  );
  try {
    const authClient = await LocalAuthApi.authSDK.getAuthByAccessToken();

    LocalAuthApi.mainApi.setOnAccessTokenChange((accessToken) => {
      if (!accessToken) return;

      authClient.token.accessToken = accessToken;

      persistAuthClient(authClient);
    });

    authClient.token.refreshToken = authData.token.refreshToken;
    persistAuthClient(authClient);

    return { authClient, isLoggedIn: LocalAuthApi.authSDK.isLoggedIn() };
  } catch (error) {
    clearAuthClient();

    return { isLoggedIn: false, authClient: undefined };
  }
};
