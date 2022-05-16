import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { UnauthorizedError } from "custom-error";
import NotFoundError from "custom-error/NotFoundError";
import { Request } from "http-server";
import Role from "models/Role";

export const checkAuthRole: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/sign-in/classic"]["POST"]["body"],
    AuthNRouteTypes["/n/sign-in/classic"]["POST"]["query"]
  >
> = async (req, res, next) => {
  const { role } = req.query;

  if (!role) {
    next();

    return;
  }
  const dbRole = await Role.findOne({ name: role });
  const { currentAuth } = res.locals;

  if (!dbRole) {
    throw new NotFoundError({
      message: "Role not found",
      stack: "Role not found in authorization check",
      ressource: "Role",
    });
  }

  if (currentAuth.role.name !== dbRole.name) {
    throw new UnauthorizedError({
      message: "User not authorized ",
      stack: "Authorization denied for user",
      reason: "User does not have this role or above",
      ressource: dbRole.name,
    });
  }

  next();
};
