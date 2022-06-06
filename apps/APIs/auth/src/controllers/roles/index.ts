import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { RolesRouteTypes } from "auth-types/routes/roles";
import { Request } from "http-server";
import * as rolesService from "services/roles";
import { StatusCodes } from "shared-types";

export const getRoles: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    RolesRouteTypes["/roles/"]["GET"]["query"]
  >,
  RolesRouteTypes["/roles/"]["GET"]["response"]
> = async (req, res) => {
  const response = await rolesService.getRoles(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const getRoleById: IAuthServerMiddleware<
  Request<
    RolesRouteTypes["/roles/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  RolesRouteTypes["/roles/:id"]["GET"]["response"]
> = async (req, res) => {
  const response = await rolesService.getRoleById(req.params.id);

  res.status(StatusCodes.OK).send(response);
};
