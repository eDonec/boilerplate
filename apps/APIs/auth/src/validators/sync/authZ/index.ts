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
