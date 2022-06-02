import { AuthZRouteTypes } from "auth-types/routes/authZ";
import FieldValidator from "field-validator";
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
> = (req, _, next) => {
  const validators = new FieldValidator(req.body);

  validators.validate.ressource.isString();

  validators.validate.privileges.isNumber().isLessThanNumber(7);

  validators.resolveErrors();

  next();
};
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
