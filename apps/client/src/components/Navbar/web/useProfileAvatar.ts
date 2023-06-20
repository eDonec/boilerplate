import { useState } from "react";

import { AuthResponse } from "auth-types/routes/authN";
import { useAuthStatus, useLogout } from "authenticator";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useProfileAvatar = ({
  authClient,
}: {
  authClient: AuthResponse;
}) => {
  const { isLoading } = useAuthStatus();
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  let userFirstLetter = "";

  if (authClient)
    userFirstLetter =
      (authClient.user.firstName ||
        authClient.userName ||
        authClient.email ||
        authClient.authID)[0].toUpperCase() +
      ((authClient.user.lastName || "")[0]?.toUpperCase() || "");
  const toggleSubmenu = () => setIsOpen(!isOpen);
  const [modalProps, onLogout] = useAlertDialog(() => {
    if (isLoading) return;
    setIsOpen(false);
    logout();
  });
  const handleLogout = () => {
    toggleSubmenu();
    onLogout();
  };

  return {
    isLoading,
    handleLogout,
    userFirstLetter,
    toggleSubmenu,
    modalProps,
  };
};
