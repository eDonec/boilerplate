import toast from "react-hot-toast";

import { createSlice } from "@reduxjs/toolkit";
import Api, { db } from "api";
import { RoleType } from "auth-types/models/Role";
import { ACCESS } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import { checkSignInStatus, signIn } from "./thunk";

type AuthState = {
  isLoggedIn: boolean;
  role?: RoleType;
  access?: ACCESS[];
  error?: TCustomErrors;
  authId?: string;
  isLoading: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      (async () => {
        try {
          await Api.authSDK.logout();
        } catch (error) {
          toast.error("already logged out");
        }
      })();
      localStorage.removeItem("dashboardAuthId");
      db.deleteData("auth", state.authId || "");
      state.isLoggedIn = false;
      state.role = undefined;
      state.access = undefined;
      state.error = undefined;
      state.authId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.role = payload?.role;
      state.access = payload?.access;
      state.isLoading = false;
      state.authId = payload?.authID;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isLoggedIn = false;
      state.role = undefined;
      state.access = undefined;
      state.isLoading = false;
      state.authId = undefined;
      state.error = payload as AuthState["error"];
    });
    builder.addCase(checkSignInStatus.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkSignInStatus.fulfilled, (state, { payload }) => {
      state.isLoggedIn = payload.isLoggedIn;
      state.role = payload?.authClient?.role;
      state.access = payload?.authClient?.access;
      state.authId = payload?.authClient?.authID;
      state.isLoading = false;
    });
    builder.addCase(checkSignInStatus.rejected, (state) => {
      localStorage.removeItem("dashboardAuthId");
      state.isLoggedIn = false;
      state.role = undefined;
      state.access = undefined;
      state.authId = undefined;
      state.isLoading = false;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
