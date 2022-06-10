import { UnauthorizedError } from "custom-error";
import { Request, Response } from "http-server";
import { client } from "init";
import rAuthAccessSchema from "models/Redis/Auth";
import {
  ACCESS,
  ACCESS_RESSOURCES,
  IMiddleware,
  PRIVILEGE,
} from "shared-types";
import { TokenValidator } from "token";

export const routeProtection =
  (
    ressource: ACCESS_RESSOURCES,
    privileges: PRIVILEGE
  ): IMiddleware<
    Request<unknown, unknown, unknown, unknown>,
    Response<unknown, { token: TokenValidator<{ authId: string }> }>
  > =>
  async (_, res, next) => {
    const { token } = res.locals;
    const authRepository = client.fetchRepository(rAuthAccessSchema);

    const redisClientAccess = await authRepository
      .search()
      .where("authId")
      .equal(token.decodedToken.payload.authId)

      .return.all();

    const access: ACCESS[] = redisClientAccess.map((o) => ({
      ressource: o.ressource,
      privileges: o.privilege,
    }));

    const userAccess = access
      // this is here to make sure that we hit the god ressource before any other ressource
      .sort((a) => (a.ressource === "*" ? 1 : -1))
      .find((a) => a.ressource === ressource || a.ressource === "*");

    if (!userAccess || userAccess.privileges < privileges)
      throw new UnauthorizedError({
        message: "Unauthorized Ressource Acccess",
        ressource,
        reason: "Access denied to this ressource with these privileges",
      });

    return next();
  };
