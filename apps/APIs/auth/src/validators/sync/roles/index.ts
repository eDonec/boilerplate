import { RoleRouteTypes } from "auth-types/routes/roles";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const getRoles: IMiddleware<
  Request<unknown, unknown, unknown, RoleRouteTypes["/roles/"]["GET"]["query"]>,
  Response<RoleRouteTypes["/roles/"]["GET"]["response"]>
> = (req, _, next) =>
  // const validators = new FieldValidator({ query: req.query });

  // validators.validate.query.page?.isNumber();
  // validators.validate.query.limit?.isNumber();
  // validators.validate.query.sortField?.isString();

  // validators.resolveErrors();

  next();
