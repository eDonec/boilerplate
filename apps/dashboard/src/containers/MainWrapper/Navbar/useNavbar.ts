import { useState } from "react";

import { useAlertDialog } from "core-ui/AlertDialog";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { logout } from "_redux/slices/auth";

export const useNavbar = () => {
  const { dispatch, isLoading } = useLoadingDispatch();
  const [isOpen, setIsOpen] = useState(false);
  // TODO: update this with the username once we have a user service
  const userFirstLetter = useAppSelector(({ auth }) => auth.authId?.[0] || "A");
  const toggleSubmenu = () => setIsOpen(!isOpen);
  const [modalProps, onLogout] = useAlertDialog(() => {
    if (isLoading) return;
    setIsOpen(false);
    dispatch(logout());
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
