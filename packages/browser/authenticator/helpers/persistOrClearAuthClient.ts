import { AuthResponse } from "auth-types/routes/authN";

import { authIndexedDb, localStorageClass } from "../api";
import { INDEXED_DB_TABLE_NAME, LOCALSTORAGE_KEY } from "../constants";

export const persistAuthClient = (auth: AuthResponse) => {
  authIndexedDb.db.createOrUpdate(INDEXED_DB_TABLE_NAME, {
    id: auth.authID,
    token: {
      accessToken: auth.token.accessToken,
      refreshToken: auth.token.refreshToken,
    },
  });
  localStorageClass.setItem(LOCALSTORAGE_KEY, auth.authID);
};

export const clearAuthClient = () => {
  const authId = localStorageClass.getItem(LOCALSTORAGE_KEY);

  localStorageClass.removeItem(LOCALSTORAGE_KEY);
  authIndexedDb.db.deleteData(INDEXED_DB_TABLE_NAME, authId ?? "");
};
