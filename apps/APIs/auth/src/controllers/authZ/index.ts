import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { AuthZRouteTypes } from "auth-types/routes/authZ";
import { Request } from "http-server";
import * as authZService from "services/authZ";
import { StatusCodes } from "shared-types";
import TokenGenerator from "token/TokenGenerator";
import TokenValidator from "token/TokenValidator";

export const refreshAccessToken: IAuthServerMiddleware<
  Request,
  AuthNRouteTypes["/z/refresh-token"]["GET"]["response"],
  {
    refreshToken: TokenValidator<{ authId: string }>;
  }
> = async (_, res) => {
  const { currentAuth, refreshToken } = res.locals;

  const accessToken = new TokenGenerator({
    aud: "all",
    iss: "auth",
    sid: refreshToken.decodedToken.sid,
    payload: {
      authId: currentAuth.id,
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
  const uploadToken = new TokenGenerator(
    {
      aud: "bucket",
      iss: "auth",
      sid: "none",
      payload: {
        mimeTypes: req.query.mimeTypes,
      },
    },
    false,
    process.env.UPLOAD_SECRET_KEY,
    process.env.UPLOAD_TOKEN_EXPIRES_IN
  );

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

export const banClient: IAuthServerMiddleware<
  Request<
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["body"],
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]
  >,
  AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]
> = async (req, res) => {
  const { currentAuth } = res.locals;
  const response = await authZService.banClient({
    bannedByUserId: currentAuth.id,
    id: req.params.id,
    ...req.body,
  });

  res.status(StatusCodes.OK).send(response);
};

export const suspendClient: IAuthServerMiddleware<
  Request<
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["body"],
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"]
  >,
  AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"]
> = async (req, res) => {
  const { currentAuth } = res.locals;

  await authZService.suspendClient(req.params.id, {
    suspendedByUserId: currentAuth.id,
    suspensionLiftTime: req.body.suspensionLiftTime,
    suspensionReason: req.body.reason,
  });

  res.status(StatusCodes.OK).send({ status: "OK" });
};

export const liftBanAndSuspension: IAuthServerMiddleware<
  Request<
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["params"],
    unknown,
    unknown,
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]
  >,
  AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]
> = async (req, res) => {
  const { currentAuth } = res.locals;
  const response = await authZService.liftBanAndSuspension({
    id: req.params.id,
    liftedByUserId: currentAuth.id,
  });

  res.status(StatusCodes.OK).send(response);
};
