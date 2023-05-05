import { AuthResponse } from "auth-types/routes/authN";
import { ACCESS } from "shared-types";

import { useAuthContext } from "./AuthContext";
import {
  clearAuthClient,
  persistAuthClient,
} from "../helpers/persistOrClearAuthClient";

export const useHandlePostSignInData = () => {
  const {
    isLoggedIn,
    isLoading,
    isInitiated,
    setAuthClient,
    setIsLoggedIn,
    setIsLoading,
    setIsInitiated,
    access,
    role,
  } = useAuthContext();

  return async (auth?: AuthResponse) => {
    if (isLoading) setIsLoading(false);
    if (!isInitiated) setIsInitiated(true);

    if (!auth) {
      setAuthClient(undefined);
      if (isLoggedIn) setIsLoggedIn(false);
      clearAuthClient();

      return;
    }
    if (role && auth.role.name !== "GOD" && !role.includes(auth.role.name)) {
      throw new Error("Role mismatch");
    }
    if (access) {
      const hasAccess = accessArayMatcher(access, auth.access);

      if (!hasAccess) {
        throw new Error("Access mismatch");
      }
    }
    setAuthClient(auth);
    if (!isLoggedIn) setIsLoggedIn(true);
    persistAuthClient(auth);
  };
};

const accessArayMatcher = (access: ACCESS[], userAccess: ACCESS[]) => {
  if (userAccess.find((o) => o.ressource === "*")) return true;

  return access.every((requestedAccessRessource) => {
    const userAccessRessource = userAccess.find(
      (o) => o.ressource === requestedAccessRessource.ressource
    );

    if (!userAccessRessource) return false;

    return (
      userAccessRessource.privileges >= requestedAccessRessource.privileges
    );
  });
};
