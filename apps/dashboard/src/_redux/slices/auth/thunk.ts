import { createAsyncThunk } from "@reduxjs/toolkit";
import Api, { db } from "api";
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
        query: { role: "PUBLIC" },
        // TODO: Change acceptable roles to "SUPER_ADMIN"
      });

      db.createOrUpdate("auth", {
        id: auth.authID,
        token: {
          accessToken: auth.token.accessToken,
          refreshToken: auth.token.refreshToken,
        },
      });
      localStorage.setItem("authId", auth.authID);

      return auth;
    } catch (error) {
      if (isApiError(error)) {
        return rejectWithValue(error.response?.data);
      }
    }
  }
);

export const checkSignInStatus = createAsyncThunk<
  {
    isLoggedIn: boolean;
  },
  void
>("auth/check-sign-in-status", async () => {
  const authId = localStorage.getItem("authId");

  if (!authId) return { isLoggedIn: false };
  const authData: IIndexedDBAuthData | undefined = await db.getData(
    "auth",
    authId
  );

  if (!authData) return { isLoggedIn: false };

  Api.mainApi.initOrReInit(
    authData.token.accessToken,
    authData.token.refreshToken
  );

  await Api.mainApi.refreshUserToken();

  return { isLoggedIn: Api.authSDK.isLoggedIn() };
});
