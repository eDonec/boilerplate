import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

export const accessMatcher = (
  access?: ACCESS[],
  ressource?: ACCESS_RESSOURCES,
  previlages?: PRIVILEGE,
  roleName?: string
) => {
  if (roleName === "GOD") return true;
  if (!ressource) return true;
  if (!access?.length) return false;

  const userAccess = [...access]
    // this is here to make sure that we hit the god ressource before any other ressource
    .sort((a) => (a.ressource === "*" ? -1 : 1))
    .find((a) => a.ressource === ressource || a.ressource === "*");

  if (!userAccess) return false;
  if (previlages == null) return true;

  return userAccess.privileges >= previlages;
};

export const getPrivilegeName = (privilage?: PRIVILEGE): string =>
  privilage ? PRIVILEGE[privilage] : "";
