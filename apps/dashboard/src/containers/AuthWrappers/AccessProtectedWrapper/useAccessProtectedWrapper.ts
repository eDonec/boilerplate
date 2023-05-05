import { useAccessMatcher } from "authenticator";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

export const useAccessProtectedWrapper = (
  ressource?: ACCESS_RESSOURCES,
  privileges?: PRIVILEGE
) => {
  const accessMatcher = useAccessMatcher();

  return {
    isAccessible: accessMatcher({ ressource, privileges }),
  };
};

export const getPrivilegeName = (privilage?: PRIVILEGE): string =>
  privilage ? PRIVILEGE[privilage] : "";
