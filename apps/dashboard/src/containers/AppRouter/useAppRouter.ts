import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { checkSignInStatus } from "_redux/slices/auth/thunk";

const optimisticIsLoggedIn = !!localStorage.getItem("authId");

let loaded = false;

export const useAppRouter = () => {
  const { isLoggedIn } = useAppSelector(({ auth }) => ({
    isLoggedIn: auth.isLoggedIn,
  }));
  const { classicDispatch } = useLoadingDispatch();

  if (!isLoggedIn && optimisticIsLoggedIn && !loaded) {
    classicDispatch(checkSignInStatus());
    loaded = true;
  }
};
