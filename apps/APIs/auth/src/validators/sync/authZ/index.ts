import { AuthZRouteTypes } from "auth-types/routes/authZ";
// import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const checkRessourceAccess: IMiddleware<
  Request<
    unknown,
    unknown,
    AuthZRouteTypes["/z/ressource-access"]["POST"]["body"],
    unknown
  >,
  Response<AuthZRouteTypes["/z/ressource-access"]["POST"]["response"]>
> = (req, _, next) =>
  // const validators = new FieldValidator({ body: req.body });

  // validators.validate.body.ressource.isString();

  // if (validators.validate.body.privileges instanceof Array) {
  //   validators.validate.body.privileges.forEach((o) => {
  //     o.isString();
  //   });
  // } else {
  //   validators.validate.body.privileges.isString();
  // }

  // validators.resolveErrors();

  next();

export const getRoles: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    AuthZRouteTypes["/z/roles"]["GET"]["query"]
  >,
  Response<AuthZRouteTypes["/z/roles"]["GET"]["response"]>
> = (req, _, next) =>
  // const validators = new FieldValidator({ query: req.query });

  // validators.validate.query.page?.isNumber();
  // validators.validate.query.limit?.isNumber();
  // validators.validate.query.sortField?.isString();

  // validators.resolveErrors();

  next();
