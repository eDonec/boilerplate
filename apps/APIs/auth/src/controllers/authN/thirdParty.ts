import { AuthNRouteTypes } from "auth-types/routes/authN";
import middlewareWithTryCatch from "errors/middlewareWithTryCatch";
import { Request, Response } from "express";
import * as authNServices from "services/authN";
import { IMiddleware, StatusCodes } from "shared-types";

export const facebookSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<
    | AuthNRouteTypes["/n/facebook"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNServices.facebookSignIn(req.body.token);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);

export const appleSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<
    | AuthNRouteTypes["/n/apple"]["POST"]["response"]
    | { message: string; stack?: string }
  >
> = middlewareWithTryCatch(async (req, res) => {
  const authResult = await authNServices.appleSignIn(req.body);

  res.status(StatusCodes.Created).send(authResult);
}, StatusCodes["Bad Request"]);
