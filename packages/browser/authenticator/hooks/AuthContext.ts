/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from "react";

import { AuthResponse } from "auth-types/routes/authN";
import { useFirstMount } from "core-hooks";
import { ACCESS } from "shared-types";

import { checkSignInStatus } from "../requests/checkLoginStatus";

export const AuthProviderContext =
  React.createContext<IAuthProviderContext | null>(null);

interface IAuthProviderContext {
  access?: ACCESS[];
  role?: string[];
  authClient: AuthResponse | undefined;
  isLoggedIn: boolean;
  isInitiated: boolean;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsInitiated: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthClient: React.Dispatch<React.SetStateAction<AuthResponse | undefined>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useAuthContext = (): IAuthProviderContext => {
  const context = React.useContext(AuthProviderContext);

  if (context === null) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return context;
};

export const useAuthProvider = (
  role?: string[],
  access?: ACCESS[]
): IAuthProviderContext => {
  const isFirstMount = useFirstMount();
  const [authClient, setAuthClient] = React.useState<AuthResponse | undefined>(
    undefined
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInitiated, setIsInitiated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    if (isFirstMount) {
      setIsLoading(true);
      checkSignInStatus().then(
        ({ isLoggedIn: _isLoggedIn, authClient: _authClient }) => {
          setIsLoggedIn(_isLoggedIn);
          setAuthClient(_authClient);
          setIsInitiated(true);
          setIsLoading(false);
        }
      );
    }
  }, [isFirstMount]);

  return {
    access,
    role,
    authClient,
    isLoggedIn,
    isInitiated,
    isLoading,
    setIsLoading,
    setIsInitiated,
    setAuthClient,
    setIsLoggedIn,
  };
};
