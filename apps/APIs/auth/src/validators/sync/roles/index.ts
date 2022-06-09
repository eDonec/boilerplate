import { RolesRouteTypes } from "auth-types/routes/roles";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware, SortDirection } from "shared-types";

export const getRoles: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    RolesRouteTypes["/roles/"]["GET"]["query"]
  >,
  Response<RolesRouteTypes["/roles/"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.query);

  validators.validate["sort-direction"]
    ?.isString()
    .isInArrayOfStrings(Object.values(SortDirection));
  validators.validate.page?.isNumber().isBiggerThanNumber(0);
  validators.validate["sort-field"]?.isString();
  validators.validate.limit?.isNumber().isBiggerThanNumber(0);

  validators.resolveErrors();

  next();
};

export const getRoleById: IMiddleware<
  Request<
    RolesRouteTypes["/roles/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<RolesRouteTypes["/roles/:id"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.params);

  validators.validate.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const updateRole: IMiddleware<
  Request<
    RolesRouteTypes["/roles/:id"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<RolesRouteTypes["/roles/:id"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.params);

  validators.validate.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const addRole: IMiddleware<
  Request<
    unknown,
    unknown,
    RolesRouteTypes["/roles/"]["POST"]["body"],
    unknown
  >,
  Response<RolesRouteTypes["/roles/"]["POST"]["response"]>
> = (_req, _res, next) =>
  // TODO : validate body
  // const validators = new FieldValidator(req.body);

  // validators.resolveErrors();

  next();
