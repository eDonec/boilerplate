import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { RoleRouteTypes } from "auth-types/routes/roles";
import { Request } from "http-server";
import * as roleService from "services/roles";
import { StatusCodes } from "shared-types";

export const getRoles: IAuthServerMiddleware<
  Request<unknown, unknown, unknown, RoleRouteTypes["/roles/"]["GET"]["query"]>,
  RoleRouteTypes["/roles/"]["GET"]["response"]
> = async (req, res) => {
  const response = await roleService.getRoles(req.query);

  res.status(StatusCodes.OK).send(response);
};
