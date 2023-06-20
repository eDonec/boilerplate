import { useState } from "react";

import { useAuthClient, useAuthStatus, useLogout } from "authenticator";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useNavbar = () => {
  const { isLoading } = useAuthStatus();
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();
  const auth = useAuthClient();
  // TODO: update this with the username or avatar once we have a user service
  const userFirstLetter = auth?.authID?.[0] || "A";
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
    isOpen,
  };
};
