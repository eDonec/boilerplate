import { useCallback } from "react";

import { useAuthContext } from "./AuthContext";
import { accessMatcher } from "../helpers/accessMatcher";
import { logout } from "../helpers/logout";
import { IAuthCallbackHooks } from "../types";
/**
 * Checks if the user is authenticated or not
 * @returns boolean
 * @example
 * const { isLoggedIn, isLoading, isInitiated } = useAuthStatus();
 */
export const useAuthStatus: IAuthCallbackHooks["useAuthStatus"] = () => {
  const { isLoggedIn, isLoading, isInitiated } = useAuthContext();

  return { isLoggedIn, isLoading, isInitiated };
};

/**
 * Returns the authClient if the user is authenticated
 * @returns AuthResponse | undefined
 * @example
 * const authClient = useAuthClient();
 */
export const useAuthClient: IAuthCallbackHooks["useAuthClient"] = () => {
  const { authClient } = useAuthContext();

  return authClient;
};

/**
 * Takes in an object with the access and privilege you want to check for and returns a boolean
 * @returns
 * boolean
 * @example
 * const accessMatcher = useAccessMatcher()
 * const hasAccess = accessMatcher({ access: ACCESS_RESSOURCES.USERS, privileges: PRIVILEGE.READ });
 */
export const useAccessMatcher: IAuthCallbackHooks["useAccessMatcher"] = () => {
  const { authClient } = useAuthContext();
  const access = authClient?.access || [];
  const roleName = authClient?.role.name || "";

  return useCallback(
    (requestedAccess) =>
      accessMatcher(
        access,
        requestedAccess.ressource,
        requestedAccess.privileges,
        roleName
      ),
    [access, roleName]
  );
};

export const useLogout: IAuthCallbackHooks["useLogout"] = () => {
  const { setIsLoggedIn, setAuthClient, setIsLoading } = useAuthContext();

  return async () => {
    setIsLoading(true);
    await logout();
    setIsLoggedIn(false);
    setAuthClient(undefined);
    setIsLoading(false);
  };
};
