import { useAuthClient, useAuthStatus } from "authenticator";

export const useAuthStateWithRole = () => {
  const { isLoading, isLoggedIn } = useAuthStatus();
  const authClient = useAuthClient();
  // const { isLoggedIn, isLoading, roleName } = useAuthState();
  const roleName = authClient?.role.name;

  if (isLoggedIn) return { isLoggedIn, isLoading, roleName };
  if (isLoading) return { isLoading };

  return { isLoggedIn: false, roleName, isLoading };
};
