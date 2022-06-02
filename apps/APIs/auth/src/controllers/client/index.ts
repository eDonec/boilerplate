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
