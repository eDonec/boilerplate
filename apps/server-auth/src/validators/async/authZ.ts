import Role from "models/Role";

import { statusCodes } from "constants/statusCodes";

import IAuthServerMiddleware from "types/IAuthServerMiddleware";

export const checkAuthRole: IAuthServerMiddleware = async (req, res, next) => {
  const { role } = req.query;

  if (!role) {
    next();

    return;
  }
  const dbRole = await Role.findOne({ name: role });
  const { currentAuth } = res.locals;

  if (!dbRole) {
    res.status(statusCodes["Not Found"]).send({
      message: "Role not found",
      stack: "Role not found in authorization check",
    });

    return;
  }

  if (!(currentAuth.role.name === dbRole.name)) {
    res.status(statusCodes.Unauthorized).send({
      message: "User not authorized ",
      stack: "Authorization denied for user",
    });

    return;
  }

  next();
};
