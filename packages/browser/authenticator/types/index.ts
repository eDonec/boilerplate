/* eslint-disable @typescript-eslint/naming-convention */
import { AuthResponse } from "auth-types/routes/authN";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

export interface IIndexedDBAuthData {
  id: string;
  token: {
    accessToken: string;
    refreshToken: string;
  };
}
export interface IAuthCallbackHooks {
  useLogout: () => () => Promise<void>;
  useAuthStatus: () => {
    isLoggedIn: boolean;
    isLoading: boolean;
    isInitiated: boolean;
  };

  useAuthClient: () => AuthResponse | undefined;
  /**
   * adds an eventListener on auth status change
   * @example
   * useAddAuthEventListener("onAuthStatusChanged", (authStatus) => {
   *  // do something with the authStatus
   * });
   */
  useAddAuthEventListener: <T extends TAuthEventNames>(
    w: T,
    func: T extends "onLogin"
      ? (authClient: AuthResponse) => void
      : T extends "onLogout"
      ? () => void
      : T extends "onAuthAction"
      ? (authStatus: {
          authAction: AUTH_ACTIONS;
          authState: boolean;
          previousAuthState: boolean;
          authClient: AuthResponse | undefined;
        }) => void
      : T extends "onAuthStatusChanged"
      ? (authStatus: { authState: boolean; previousAuthState: boolean }) => void
      : T extends "onAuthActionChanged"
      ? (authAction: AUTH_ACTIONS) => void
      : never
  ) => void;

  useAccessMatcher: () => (requestedAccess: {
    ressource?: ACCESS_RESSOURCES;
    privileges?: PRIVILEGE;
  }) => boolean;
}

type TAuthEventNames =
  | "onLogin"
  | "onLogout"
  | "onAuthAction"
  | "onAuthStatusChanged"
  | "onAuthActionChanged";

export enum AUTH_ACTIONS {
  SIGN_IN_CLASSIC = "SIGN_IN_CLASSIC",
  SIGN_IN_FACEBOOK = "SIGN_IN_FACEBOOK",
  SIGN_IN_GOOGLE = "SIGN_IN_GOOGLE",
  SIGN_UP_CLASSIC = "SIGN_UP_CLASSIC",
  SIGN_OUT = "SIGN_OUT",
}
