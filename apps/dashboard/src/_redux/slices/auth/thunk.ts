import { createAsyncThunk } from "@reduxjs/toolkit";
import Api, { db } from "api";
import { AuthResponse } from "auth-types/routes/authN";
import { ISignInForm } from "pages/SignIn/useSignIn";
import { isApiError } from "server-sdk";

interface IIndexedDBAuthData {
  id: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export const signIn = createAsyncThunk(
  "auth/sign-in",
  async (signInFormValues: ISignInForm, { rejectWithValue }) => {
    try {
      const auth = await Api.authSDK.signInClassic({
        body: signInFormValues,
      });

      persistAuthClient(auth);

      return auth;
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data);
      }

      return rejectWithValue(error);
    }
  }
);

export const checkSignInStatus = createAsyncThunk<
  {
    isLoggedIn: boolean;
    authClient?: AuthResponse;
  },
  void
>("auth/check-sign-in-status", async () => {
  const authId = localStorage.getItem("dashboardAuthId");

  if (!authId) return { isLoggedIn: false };
  const authData: IIndexedDBAuthData | undefined = await db.getData(
    "auth",
    authId
  );

  if (!authData) return { isLoggedIn: false, authClient: undefined };

  Api.mainApi.initOrReInit(
    authData.token.accessToken,
    authData.token.refreshToken
  );
  const authClient = await Api.authSDK.getAuthByAccessToken();

  Api.mainApi.setOnAccessTokenChange((accessToken) => {
    if (!accessToken) return;

    authClient.token.accessToken = accessToken;

    persistAuthClient(authClient);
  });
  authClient.token.refreshToken = authData.token.refreshToken;
  persistAuthClient(authClient);

  return { authClient, isLoggedIn: Api.authSDK.isLoggedIn() };
});

const persistAuthClient = (auth: AuthResponse) => {
  db.createOrUpdate("auth", {
    id: auth.authID,
    token: {
      accessToken: auth.token.accessToken,
      refreshToken: auth.token.refreshToken,
    },
  });
  localStorage.setItem("dashboardAuthId", auth.authID);
};
