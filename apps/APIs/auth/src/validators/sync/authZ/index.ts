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

export const banClient: IMiddleware<
  Request<
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/ban-client/:id"]["POST"]["body"],
    unknown
  >,
  Response<AuthZRouteTypes["/z/ban-client/:id"]["POST"]["response"]>
> = (req, _, next) =>
  // const validators = new FieldValidator({ body: req.body, params: req.params });

  // validators.validate.body.reason.isString();

  // validators.validate.params.id.isString();

  // validators.resolveErrors();

  next();

export const suspendClient: IMiddleware<
  Request<
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["params"],
    unknown,
    AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["body"],
    unknown
  >,
  Response<AuthZRouteTypes["/z/suspend-client/:id"]["POST"]["response"]>
> = (req, _, next) =>
  // const validators = new FieldValidator({ body: req.body, params: req.params });

  // validators.validate.body.reason.isString();
  // validators.validate.body.suspensionLiftTime.isDate();

  // validators.validate.params.id.isString();

  // validators.resolveErrors();

  next();

export const liftBanAndSuspension: IMiddleware<
  Request<
    AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<AuthZRouteTypes["/z/lift-ban-suspension/:id"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.params);

  validators.validate.id.isString();

  validators.resolveErrors();

  return next();
};
export const updateClientAccess: IMiddleware<
  Request<
    AuthZRouteTypes["/z/access/:id"]["PUT"]["params"],
    unknown,
    AuthZRouteTypes["/z/access/:id"]["PUT"]["body"],
    unknown
  >,
  Response<AuthZRouteTypes["/z/access/:id"]["PUT"]["response"]>
> = (req, _, next) => {
  const roleValidator = new FieldValidator({ role: req.body.role });
  const paramsValidator = new FieldValidator(req.params);

  roleValidator.validate.role.isString().isValidObjectId();

  paramsValidator.validate.id.isString().isValidObjectId();

  roleValidator.resolveErrors();
  paramsValidator.resolveErrors();

  return next();
};
