import FieldValidator from "field-validator";
import { StatusRouteTypes } from "health-types/routes/status";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const getMicroservicesStatus: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    StatusRouteTypes["/status/"]["GET"]["query"]
  >,
  Response<StatusRouteTypes["/status/"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ query: req.query });

  validators.validate.query?.page?.isNumber().isBiggerThanNumber(0);
  validators.validate.query?.limit?.isNumber().isBiggerThanNumber(0);

  validators.resolveErrors();

  return next();
};

export const getMicroserviceStatusHistoryByName: IMiddleware<
  Request<
    StatusRouteTypes["/status/:name"]["GET"]["params"],
    unknown,
    unknown,
    StatusRouteTypes["/status/:name"]["GET"]["query"]
  >,
  Response<StatusRouteTypes["/status/:name"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({
    params: req.params,
    query: req.query,
  });

  validators.validate.query.page?.isNumber().isBiggerThanNumber(0);
  validators.validate.query.limit?.isNumber().isBiggerThanNumber(0);
  validators.validate.params.name.isString();

  validators.resolveErrors();

  return next();
};
