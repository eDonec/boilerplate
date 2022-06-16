import { AuthDocument } from "auth-types/models/Auth";
import { AuthNRouteTypes } from "auth-types/routes/authN";
import { NotFoundError } from "custom-error";
import { Request, Response } from "http-server";
import Auth from "models/Auth";
import { IMiddleware } from "shared-types";
import { TokenValidator } from "token";

export const getAuthByAccessToken: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<
    AuthNRouteTypes["/n/me"]["GET"]["response"],
    { token: TokenValidator<{ authId: string }>; currentAuth: AuthDocument }
  >
> = async (_, res, next) => {
  const { token } = res.locals;

  const currentAuth = await Auth.findOne({
    _id: token.decodedToken.payload.authId,
  });

  if (!currentAuth)
    throw new NotFoundError({
      message: "No user was found with this token",
      ressource: "Auth",
    });
  res.locals.currentAuth = currentAuth;
  next();
};
