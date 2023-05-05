import { AuthNRouteTypes } from "auth-types/routes/authN";
import { Request, Response } from "http-server";
import * as authNServices from "services/authN";
import * as userService from "services/user";
import { IMiddleware, StatusCodes } from "shared-types";

export const facebookSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/facebook"]["POST"]["body"]>,
  Response<AuthNRouteTypes["/n/facebook"]["POST"]["response"]>
> = async (req, res) => {
  const { authResult, initialUserData } = await authNServices.facebookSignIn(
    req.body.token
  );

  const user = await userService.createUser(authResult.authID, initialUserData);

  res.status(StatusCodes.Created).send({ ...authResult, user });
};

export const appleSignIn: IMiddleware<
  Request<unknown, unknown, AuthNRouteTypes["/n/apple"]["POST"]["body"]>,
  Response<AuthNRouteTypes["/n/apple"]["POST"]["response"]>
> = async (req, res) => {
  const { authResult, initialUserData } = await authNServices.appleSignIn(
    req.body
  );

  const user = await userService.createUser(authResult.authID, initialUserData);

  res.status(StatusCodes.Created).send({ ...authResult, user });
};

export const googleSignIn: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthNRouteTypes["/n/google"]["POST"]["body"],
    unknown
  >,
  Response<unknown>
> = async (req, res) => {
  const { authResult, initialUserData } = await authNServices.googleSignIn(
    req.body.token
  );

  const user = await userService.createUser(authResult.authID, initialUserData);

  res.status(StatusCodes.Created).send({ ...authResult, user });
};
