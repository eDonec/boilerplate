import { StatusRouteTypes } from "health-types/routes/status";
import { Request, Response } from "http-server";
import * as statusService from "services/status";
import { IMiddleware, StatusCodes } from "shared-types";

export const getMicroservicesStatus: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    StatusRouteTypes["/status/"]["GET"]["query"]
  >,
  Response<StatusRouteTypes["/status/"]["GET"]["response"]>
> = async (_, res) => {
  const response = await statusService.getMicroservicesStatus();

  res.status(StatusCodes.OK).send(response);
};

export const getMicroserviceStatusHistoryByName: IMiddleware<
  Request<
    StatusRouteTypes["/status/:name"]["GET"]["params"],
    unknown,
    unknown,
    StatusRouteTypes["/status/:name"]["GET"]["query"]
  >,
  Response<StatusRouteTypes["/status/:name"]["GET"]["response"]>
> = async (_, res) => {
  const { name } = _.params;
  const { limit, page } = _.query;
  const response = await statusService.getMicroserviceStatusHistoryByName(
    name,
    { limit, page }
  );

  res.status(StatusCodes.OK).send(response);
};
