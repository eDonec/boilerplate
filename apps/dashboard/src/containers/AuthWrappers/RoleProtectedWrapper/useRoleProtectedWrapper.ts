import { useAppSelector } from "hooks/reduxHooks";

export const useRoleProtectedWrapper = ({ role }: { role: string }) => {
  const authRole = useAppSelector(({ auth }) => auth.role);

  if (authRole?.name !== role) return { isAccessible: false };

  return { isAccessible: true };
};
