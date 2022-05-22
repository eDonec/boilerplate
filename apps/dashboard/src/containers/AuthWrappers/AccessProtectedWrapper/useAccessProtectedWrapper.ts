import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useAppSelector } from "hooks/reduxHooks";

export const useAccessProtectedWrapper = (
  ressource?: ACCESS_RESSOURCES,
  previlages?: PRIVILEGE | PRIVILEGE[]
) => {
  const access = useAppSelector(({ auth }) => auth.access);

  return {
    isAccessible: accessMatcher(access, ressource, previlages),
  };
};

export const accessMatcher = (
  access?: ACCESS[],
  ressource?: ACCESS_RESSOURCES,
  previlages?: PRIVILEGE | PRIVILEGE[]
) => {
  if (!ressource) return true;
  if (!access?.length) return false;

  const userAccess = access.find(
    (a) => a.ressource === ressource || a.ressource === "*"
  );

  if (!userAccess) return false;
  if (!previlages) return true;
  if (!Array.isArray(previlages)) {
    return userAccess.privileges.includes(previlages);
  }

  if (previlages.length === 0) return true;

  return previlages.every((p) => userAccess.privileges.includes(p));
};
