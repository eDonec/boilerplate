import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { UnauthorizedError } from "custom-error";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { constructRoleArray } from "helpers/constructRoleArray";

export const routeProtection =
  (
    ressource: ACCESS_RESSOURCES,
    privileges: PRIVILEGE
  ): IAuthServerMiddleware =>
  (_, res, next) => {
    const { currentAuth } = res.locals;

    const access = constructRoleArray(
      currentAuth.role,
      currentAuth.customAccessList
    );

    const userAccess = access
      // this is here to make sure that we hit the god ressource before any other ressource
      .sort((a) => (a.ressource === "*" ? -1 : 1))
      .find((a) => a.ressource === ressource || a.ressource === "*");

    if (!userAccess || userAccess.privileges < privileges)
      throw new UnauthorizedError({
        message: "Unauthorized Ressource Acccess",
        ressource,
        reason: "Access denied to this ressource with these privileges",
      });

    return next();
  };
