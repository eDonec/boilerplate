import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { Request, Response } from "http-server";
import * as authZService from "services/authZ";
import { ACCESS, IMiddleware, StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

import { constructRoleArray } from "helpers/constructRoleArray";

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/z/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (_, res) => {
  const { currentAuth, refreshToken } = res.locals;
  const access = constructRoleArray(
    currentAuth.role,
    currentAuth.customAccessList
  );
  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "auth",
    sid: refreshToken.decodedToken.sid,
    payload: {
      authId: currentAuth._id.toString(),
      access,
    },
  });

  res.status(StatusCodes.Created).send(accessToken.token);
};

export const getUploadToken: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    AuthNRouteTypes["/z/upload-token"]["GET"]["query"]
  >,
  AuthNRouteTypes["/z/upload-token"]["GET"]["response"]
> = (req, res) => {
  const uploadToken = authZService.getUploadToken(req.query.mimeTypes);

  res.status(StatusCodes.Created).send(uploadToken.token);
};

export const checkRessourceAccess: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    AuthZRouteTypes["/z/ressource-access"]["POST"]["body"],
    unknown
  >,
  AuthZRouteTypes["/z/ressource-access"]["POST"]["response"]
> = async (_, res) => {
  res.status(StatusCodes.Accepted).send("OK");
};

export const getRoles: IAuthServerMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    AuthZRouteTypes["/z/roles"]["GET"]["query"]
  >,
  AuthZRouteTypes["/z/roles"]["GET"]["response"]
> = async (req, res) => {
  const response = await authZService.getRoles(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const banClient: IMiddleware<
  Request<
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["body"],
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]
  >,
  Response<
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"],
    { token: TokenValidator<{ authId: string; access: ACCESS[] }> }
  >
> = async (req, res) => {
  const { token } = res.locals;
  const response = await authZService.banClient({
    bannedByUserId: token.decodedToken.payload.authId,
    id: req.params.id,
    ...req.body,
  });

  res.status(StatusCodes.OK).send(response);
};

export const suspendClient: IMiddleware<
  Request<
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["body"],
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"]
  >,
  Response<
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"],
    { token: TokenValidator<{ authId: string; access: ACCESS[] }> }
  >
> = async (req, res) => {
  const { token } = res.locals;

  await authZService.suspendClient(req.params.id, {
    suspendedByUserId: token.decodedToken.payload.authId,
    suspensionLiftTime: req.body.suspensionLiftTime,
    suspensionReason: req.body.reason,
  });

  res.status(StatusCodes.OK).send({ status: "OK" });
};

export const liftBanAndSuspension: IMiddleware<
  Request<
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["params"],
    unknown,
    unknown,
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]
  >,
  Response<
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"],
    { token: TokenValidator<{ authId: string; access: ACCESS[] }> }
  >
> = async (req, res) => {
  const { token } = res.locals;
  const response = await authZService.liftBanAndSuspension({
    id: req.params.id,
    liftedByUserId: token.decodedToken.payload.authId,
  });

  res.status(StatusCodes.OK).send(response);
};

export const updateClientAccess: IAuthServerMiddleware<
  Request<
    AuthZRouteTypes["/z/access/:id"]["PUT"]["params"],
    unknown,
    AuthZRouteTypes["/z/access/:id"]["PUT"]["body"],
    unknown
  >,
  AuthZRouteTypes["/z/access/:id"]["PUT"]["response"]
> = async (req, res) => {
  await authZService.updateClientAccess(
    req.params.id,
    res.locals.currentAuth,
    req.body
  );

  res.status(StatusCodes.OK).send("OK");
};
