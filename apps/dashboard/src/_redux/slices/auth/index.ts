import { createSlice } from "@reduxjs/toolkit";
import { RoleType } from "auth-types/models/Role";
import { ACCESS } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import { checkSignInStatus, signIn } from "./thunk";

type AuthState = {
  isLoggedIn: boolean;
  role?: RoleType;
  access?: ACCESS[];
  error?: TCustomErrors;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.role = payload?.role;
      state.access = payload?.access;
    });
    builder.addCase(signIn.rejected, (state, { payload }) => {
      state.isLoggedIn = false;
      state.role = undefined;
      state.access = undefined;
      state.error = payload as AuthState["error"];
    });
    builder.addCase(checkSignInStatus.fulfilled, (state, payload) => {
      state.isLoggedIn = payload.payload.isLoggedIn;
    });
  },
});

export default authSlice.reducer;
