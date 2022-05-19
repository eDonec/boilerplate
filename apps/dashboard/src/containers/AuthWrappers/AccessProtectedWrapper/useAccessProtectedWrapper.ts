import { PRIVILEGE } from "shared-types";

import { useAppSelector } from "hooks/reduxHooks";

export const useAccessProtectedWrapper = (
  ressource: string,
  previlages: PRIVILEGE | PRIVILEGE[]
) => {
  const access = useAppSelector(({ auth }) => auth.access);

  if (!access?.length) return { isAccessible: false };

  const userAccess = access.find(
    (a) => a.ressource === ressource || a.ressource === "*"
  );

  if (!userAccess) return { isAccessible: false };

  if (!Array.isArray(previlages)) {
    return { isAccessible: userAccess.privileges.includes(previlages) };
  }

  if (previlages.length === 0) return { isAccessible: true };

  return {
    isAccessible: previlages.every((p) => userAccess.privileges.includes(p)),
  };
};
