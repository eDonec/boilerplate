import { AuthDocument } from "auth-types/models/Auth";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { UnauthorizedError } from "custom-error";
import { Request, Response } from "http-server";
import { ACCESS, IMiddleware } from "shared-types";
import { TokenValidator } from "token";

import { constructRoleArray } from "helpers/constructRoleArray";

export const routeProtectionFallback: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthZRouteTypes["/z/ressource-access"]["POST"]["body"],
    unknown
  >,
  Response<
    AuthZRouteTypes["/z/ressource-access"]["POST"]["response"],
    {
      token: TokenValidator<{ authId: string; access: ACCESS[] }>;
      currentAuth: AuthDocument;
    }
  >
> = (req, res, next) => {
  const { currentAuth } = res.locals;
  const { privileges, ressource } = req.body;

  const access = constructRoleArray(
    currentAuth.role,
    currentAuth.customAccessList
  );

  const userAccess = access
    // this is here to make sure that we hit the "GOD" ressource before any other ressource
    .sort((a) => (a.ressource === "*" ? 1 : -1))
    .find((a) => a.ressource === ressource || a.ressource === "*");

  if (!userAccess || userAccess.privileges < privileges)
    throw new UnauthorizedError({
      message: "Unauthorized Ressource Acccess",
      ressource,
      reason: "Access denied to this ressource with these privileges",
    });

  return next();
};
