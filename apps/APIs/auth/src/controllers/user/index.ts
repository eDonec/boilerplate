import { UserRouteTypes } from "auth-types/routes/user";
import { Request, Response } from "http-server";
import * as userService from "services/user";
import { IMiddleware, StatusCodes } from "shared-types";
import { TCurrentAuthLocals } from "token";

export const updateUser: IMiddleware<
  Request<
    UserRouteTypes["/user/:authID"]["PUT"]["params"],
    unknown,
    UserRouteTypes["/user/:authID"]["PUT"]["body"],
    unknown
  >,
  Response<UserRouteTypes["/user/:authID"]["PUT"]["response"]>
> = async (req, res) => {
  const response = await userService.updateUser(req.params.authID, req.body);

  res.status(StatusCodes.OK).send(response);
};

export const getUser: IMiddleware<
  Request<
    UserRouteTypes["/user/:authID"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<UserRouteTypes["/user/:authID"]["GET"]["response"]>
> = async (req, res) => {
  const response = await userService.getUser(req.params.authID);

  res.status(StatusCodes.OK).send(response);
};

export const getUsers: IMiddleware<
  Request<unknown, unknown, unknown, UserRouteTypes["/user/"]["GET"]["query"]>,
  Response<UserRouteTypes["/user/"]["GET"]["response"]>
> = async (req, res) => {
  const response = await userService.getUsers(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const updateSelf: IMiddleware<
  Request<unknown, unknown, UserRouteTypes["/user/me"]["PUT"]["body"], unknown>,
  Response<UserRouteTypes["/user/me"]["PUT"]["response"], TCurrentAuthLocals>
> = async (req, res) => {
  const response = await userService.updateUser(
    res.locals.token.decodedToken.payload.authId,
    req.body
  );

  res.status(StatusCodes.OK).send(response);
};

export const getUnpaginatedMinimalUsers: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<UserRouteTypes["/user/unpaginated-minimal-users"]["GET"]["response"]>
> = async (_, res) => {
  const response = await userService.getUnpaginatedMinimalUsers();

  res.status(StatusCodes.OK).send(response);
};

export const isPhoneNumberAvailable: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    UserRouteTypes["/user/is-phonenumber-available"]["GET"]["query"]
  >,
  Response<UserRouteTypes["/user/is-phonenumber-available"]["GET"]["response"]>
> = async (req, res) => {
  const response = await userService.isPhoneNumberAvailable(
    req.query.phoneNumber
  );

  res.status(StatusCodes.OK).send(response);
};
