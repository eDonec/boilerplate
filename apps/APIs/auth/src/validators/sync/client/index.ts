import { ClientRouteTypes } from "auth-types/routes/client";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware, SortDirection } from "shared-types";

export const getAuthenticatedClients: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    ClientRouteTypes["/clients/"]["GET"]["query"]
  >,
  Response<ClientRouteTypes["/clients/"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.query);

  validators.validate["sort-direction"]
    ?.isString()
    .isInArrayOfStrings(Object.values(SortDirection));
  validators.validate.page?.isNumber().isBiggerThanNumber(0);

  validators.validate["sort-field"]?.isString();
  validators.validate.limit?.isNumber().isBiggerThanNumber(0);

  validators.resolveErrors();

  return next();
};

export const getClientById: IMiddleware<
  Request<
    ClientRouteTypes["/clients/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<ClientRouteTypes["/clients/:id"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator(req.params);

  validators.validate.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const updateClientAccess: IMiddleware<
  Request<
    ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["params"],
    unknown,
    ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["body"],
    unknown
  >,
  Response<ClientRouteTypes["/clients/clientAccess/:id"]["PUT"]["response"]>
> = (req, _, next) => {
  const roleValidator = new FieldValidator({ role: req.body.role });
  const paramsValidator = new FieldValidator(req.params);

  roleValidator.validate.role.isString().isValidObjectId();

  paramsValidator.validate.id.isString().isValidObjectId();

  roleValidator.resolveErrors();
  paramsValidator.resolveErrors();

  return next();
};
