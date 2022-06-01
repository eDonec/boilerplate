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
