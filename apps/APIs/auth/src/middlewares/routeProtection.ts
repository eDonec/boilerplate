import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { UnauthorizedError } from "custom-error";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { constructRoleArray } from "helpers/constructRoleArray";

export const routeProtection =
  (
    ressource: ACCESS_RESSOURCES,
    privileges: PRIVILEGE | PRIVILEGE[]
  ): IAuthServerMiddleware =>
  (_, res, next) => {
    const { currentAuth } = res.locals;

    const ErrorToThrow = new UnauthorizedError({
      message: "Unauthorized Ressource Acccess",
      ressource,
      reason: "Access denied to this ressource with these privileges",
    });
    const access = constructRoleArray(
      currentAuth.role,
      currentAuth.customAccessList
    );
    const userAccess = access.find(
      (a) => a.ressource === ressource || a.ressource === "*"
    );

    if (!userAccess) throw ErrorToThrow;
    if (!Array.isArray(privileges)) {
      if (!userAccess.privileges.includes(privileges)) {
        throw ErrorToThrow;
      }

      return next();
    }
    if (privileges.length === 0) return next();
    if (privileges.every((p) => userAccess.privileges.includes(p))) {
      return next();
    }
    throw ErrorToThrow;
  };
