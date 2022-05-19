import { useAppSelector } from "hooks/reduxHooks";

const optimisticIsLoggedIn = !!localStorage.getItem("authId");

export const useAuthState = () => {
  const { isLoading, isLoggedIn, role } = useAppSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
    isLoading: auth.isLoading,
    role: auth.role,
  }));

  if (isLoggedIn) return { isLoggedIn, isLoading, roleName: role?.name };
  if (!optimisticIsLoggedIn) return { isLoggedIn: false };
  if (isLoading) return { isLoading };

  return { isLoggedIn: false, roleName: role?.name, isLoading };
};
