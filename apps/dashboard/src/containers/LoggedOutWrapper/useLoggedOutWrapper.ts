import { useAppSelector } from "hooks/reduxHooks";

export const useLoggedOutWrapper = () => {
  const isLoggedIn = useAppSelector(({ auth }) => auth.isLoggedIn);

  return { isLoggedIn };
};
