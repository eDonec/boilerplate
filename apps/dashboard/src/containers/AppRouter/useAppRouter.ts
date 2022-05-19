import { useEffect } from "react";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { checkSignInStatus } from "_redux/slices/auth/thunk";

const optimisticIsLoggedIn = !!localStorage.getItem("authId");

export const useAppRouter = () => {
  const { isLoggedIn } = useAppSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));
  const { classicDispatch } = useLoadingDispatch();

  useEffect(() => {
    if (!isLoggedIn && optimisticIsLoggedIn)
      classicDispatch(checkSignInStatus());
  }, [isLoggedIn]);
};
