import { ResponseTypes } from "api-types/auth-api/authNRoutes";
import IAuthServerMiddleware from "api-types/auth-api/IAuthServerMiddleware";
import { Request } from "express";
import Role from "models/Role";
import StatusCodes from "shared-types/StatusCodes";

export const checkAuthRole: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    ResponseTypes["/n/sign-in/classic"]["POST"]["body"],
    ResponseTypes["/n/sign-in/classic"]["POST"]["query"]
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
    res.status(StatusCodes["Not Found"]).send({
      message: "Role not found",
      stack: "Role not found in authorization check",
    });

    return;
  }

  if (currentAuth.role.name !== dbRole.name) {
    res.status(StatusCodes.Unauthorized).send({
      message: "User not authorized ",
      stack: "Authorization denied for user",
    });

    return;
  }

  next();
};
