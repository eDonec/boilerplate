import IAuthServerMiddleware from "auth-types/IAuthServerMiddleware";
import { ClientRouteTypes } from "auth-types/routes/client";
import { Request, Response } from "http-server";
import * as clientService from "services/client";
import { IMiddleware, StatusCodes } from "shared-types";

export const getAuthenticatedClients: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    ClientRouteTypes["/clients/"]["GET"]["query"]
  >,
  Response<ClientRouteTypes["/clients/"]["GET"]["response"]>
> = async (req, res) => {
  const response = await clientService.getAuthenticatedClients(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const getClientById: IMiddleware<
  Request<
    ClientRouteTypes["/clients/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<ClientRouteTypes["/clients/:id"]["GET"]["response"]>
> = async (req, res) => {
  const response = await clientService.getClientById(req.params.id);

  res.status(StatusCodes.OK).send(response);
};

export const updateClientAccess: IAuthServerMiddleware<
  Request<
    ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["params"],
    unknown,
    ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["body"],
    unknown
  >,
  ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["response"]
> = async (req, res) => {
  await clientService.updateClientAccess(
    req.params.id,
    res.locals.currentAuth,
    req.body
  );

  res.status(StatusCodes.OK).send("OK");
};
