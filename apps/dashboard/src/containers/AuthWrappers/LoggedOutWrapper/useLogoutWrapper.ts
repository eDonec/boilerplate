import { useEffect } from "react";
import toast from "react-hot-toast";

import { useAuthState } from "hooks/useAuthState";

export const useLogoutWrapper = () => {
  const { isLoggedIn, isLoading, roleName } = useAuthState();

  useEffect(() => {
    if (!isLoading && isLoggedIn && roleName === "PUBLIC")
      toast.error("You are not authorized to view this page");
  }, [isLoggedIn, roleName, isLoading]);

  return { isLoggedIn, isLoading, roleName };
};
