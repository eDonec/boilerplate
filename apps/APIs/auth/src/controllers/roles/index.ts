import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { RolesRouteTypes } from "auth-types/routes/roles";
import { Request } from "http-server";
import * as rolesService from "services/roles";
import { StatusCodes } from "shared-types";

import { constructRoleArray } from "helpers/constructRoleArray";

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

export const updateRole: IAuthServerMiddleware<
  Request<
    RolesRouteTypes["/roles/:id"]["PUT"]["params"],
    unknown,
    RolesRouteTypes["/roles/:id"]["PUT"]["body"],
    unknown
  >,
  RolesRouteTypes["/roles/:id"]["PUT"]["response"]
> = async (req, res) => {
  await rolesService.updateRole(
    req.params.id,
    req.body,
    res.locals.currentAuth
  );

  res.status(StatusCodes.OK).send("OK");
};

export const addRole: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    RolesRouteTypes["/roles/"]["POST"]["body"],
    unknown
  >,
  RolesRouteTypes["/roles/"]["POST"]["response"]
> = async (req, res) => {
  await rolesService.addRole(req.body);

  res.status(StatusCodes.Created).send("OK");
};

export const deleteRole: IAuthServerMiddleware<
  Request<
    RolesRouteTypes["/roles/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  RolesRouteTypes["/roles/:id"]["DELETE"]["response"]
> = async (req, res) => {
  await rolesService.deleteRole(req.params.id);

  res.status(StatusCodes.OK).send("OK");
};

export const getGrantableRoles: IAuthServerMiddleware<
  Request<
    RolesRouteTypes["/roles/grantable/:authId"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  RolesRouteTypes["/roles/grantable/:authId"]["GET"]["response"]
> = async (req, res) => {
  const { currentAuth } = res.locals;

  const access = constructRoleArray(
    currentAuth.role,
    currentAuth.customAccessList
  );
  const response = await rolesService.getGrantableRoles(
    access,
    req.params.authId
  );

  res.status(StatusCodes.OK).send(response);
};
