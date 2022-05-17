import { useEffect } from "react";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { checkSignInStatus } from "_redux/slices/auth/thunk";

export const usePrivateWrapper = () => {
  const isLoggedIn = useAppSelector(({ auth }) => auth.isLoggedIn);

  const { dispatch, isLoading } = useLoadingDispatch(1);

  useEffect(() => {
    if (!isLoggedIn) dispatch(checkSignInStatus());
  }, [isLoggedIn]);

  if (isLoggedIn) return { isLoggedIn };

  const optimisticIsLoggedIn = !!localStorage.getItem("authId");

  if (isLoading) return { isLoggedIn: optimisticIsLoggedIn };

  return { isLoggedIn: false };
};
