import { AuthNRouteTypes } from "auth-types/routes/authN";
import { Request, Response } from "http-server";
import * as authNServices from "services/authN";
import { IMiddleware, StatusCodes } from "shared-types";

export const facebookSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<AuthNRouteTypes["/n/facebook"]["POST"]["response"]>
> = async (req, res) => {
  const authResult = await authNServices.facebookSignIn(req.body.token);

  res.status(StatusCodes.Created).send(authResult);
};

export const appleSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<AuthNRouteTypes["/n/apple"]["POST"]["response"]>
> = async (req, res) => {
  const authResult = await authNServices.appleSignIn(req.body);

  res.status(StatusCodes.Created).send(authResult);
};
