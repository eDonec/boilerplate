import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { LeanRoleDocument } from "auth-types/models/Role";
import { UnauthorizedError } from "custom-error";
import { Request } from "http-server";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { constructRoleArray } from "helpers/constructRoleArray";

export const checkRoleValidity: IAuthServerMiddleware<
  Request<unknown, unknown, LeanRoleDocument>
> = (req, res, next) => {
  const { currentAuth } = res.locals;
  const { access: roleAccess } = req.body;
  const currentAuthAccess = constructRoleArray(
    currentAuth.role,
    currentAuth.customAccessList
  );
  const godAccountAccess = currentAuthAccess.find(
    (el) => el.ressource === ACCESS_RESSOURCES["*"]
  );

  if (!godAccountAccess || godAccountAccess.privileges < PRIVILEGE.REVOKE)
    for (let i = 0; i < roleAccess.length; i++) {
      let errorMessage = "";
      const access = roleAccess[i];
      const currentAuthAccessRessource = currentAuthAccess.find(
        (a) => a.ressource === access.ressource
      );

      if (!currentAuthAccessRessource)
        errorMessage = "Current auth has no access to this ressource";
      else if (
        currentAuthAccessRessource.privileges < PRIVILEGE.GRANT &&
        access.privileges > PRIVILEGE.DELETE_SELF
      )
        errorMessage = "Current auth has no grant privilege to this ressource";
      else if (
        currentAuthAccessRessource.privileges < PRIVILEGE.REVOKE &&
        access.privileges >= PRIVILEGE.REVOKE
      )
        errorMessage =
          "Current auth cannot grant revoke privileges to this ressource";
      if (errorMessage)
        throw new UnauthorizedError({
          message: errorMessage,
          ressource: access.ressource,
          reason: "Access denied to this ressource with these privileges",
        });
    }

  next();
};
