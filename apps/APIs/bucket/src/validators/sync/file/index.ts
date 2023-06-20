import { FileRouteTypes } from "bucket-types/routes/file";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const addByUrl: IMiddleware<
  Request<
    unknown,
    unknown,
    FileRouteTypes["/file/create-by-url"]["POST"]["body"],
    unknown
  >,
  Response<FileRouteTypes["/file/create-by-url"]["POST"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body });

  validators.validate.body.url.isString();

  validators.resolveErrors();

  return next();
};
