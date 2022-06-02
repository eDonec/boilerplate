import { ClientRouteTypes } from "auth-types/routes/client";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

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
    .isInArrayOfStrings(["asc", "dsc"]);
  validators.validate.page?.isNumber().isBiggerThanNumber(0);
  validators.validate["sort-field"]?.isString().isSnakeCase();
  validators.validate.limit?.isNumber().isBiggerThanNumber(0);

  validators.resolveErrors();

  return next();
};
