import { useEffect } from "react";
import toast from "react-hot-toast";

import { useAuthStateWithRole } from "hooks/useAuthStateWithRole";

export const useLogoutWrapper = () => {
  const { isLoading, isLoggedIn, roleName } = useAuthStateWithRole();

  useEffect(() => {
    if (!isLoading && isLoggedIn && roleName === "PUBLIC")
      toast.error("You are not authorized to view this page");
  }, [isLoggedIn, roleName, isLoading]);

  return { isLoggedIn, isLoading, roleName };
};
