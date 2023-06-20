import { UserRouteTypes } from "auth-types/routes/user";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const updateUser: IMiddleware<
  Request<
    UserRouteTypes["/user/:authID"]["PUT"]["params"],
    unknown,
    UserRouteTypes["/user/:authID"]["PUT"]["body"],
    unknown
  >,
  Response<UserRouteTypes["/user/:authID"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body, params: req.params });

  validators.validate.body.firstName?.isString();
  validators.validate.body.lastName?.isString();
  validators.validate.body.avatar?.key.isString();
  validators.validate.body.avatar?.type.isString();
  validators.validate.body.avatar?.name.isString();
  validators.validate.body.avatar?._id.isString();
  validators.validate.body.avatar?.url.isString();

  validators.validate.params.authID.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const getUser: IMiddleware<
  Request<
    UserRouteTypes["/user/:authID"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<UserRouteTypes["/user/:authID"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.authID.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const getUsers: IMiddleware<
  Request<unknown, unknown, unknown, UserRouteTypes["/user/"]["GET"]["query"]>,
  Response<UserRouteTypes["/user/"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ query: req.query });

  validators.validate.query.page?.isString();
  validators.validate.query.limit?.isString();
  validators.validate.query["sort-direction"]?.isString();
  validators.validate.query["sort-field"]?.isString();
  validators.validate.query.keyword?.isString();

  validators.resolveErrors();

  return next();
};

export const updateSelf: IMiddleware<
  Request<unknown, unknown, UserRouteTypes["/user/me"]["PUT"]["body"], unknown>,
  Response<UserRouteTypes["/user/me"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body });

  validators.validate.body.phoneNumber.isString();
  validators.validate.body.firstName?.isString();
  validators.validate.body.lastName?.isString();
  validators.validate.body.avatar?.key.isString();
  validators.validate.body.avatar?.type.isString();
  validators.validate.body.avatar?.name.isString();
  validators.validate.body.avatar?._id.isString();
  validators.validate.body.avatar?.url.isString();

  validators.resolveErrors();

  return next();
};

export const isPhoneNumberAvailable: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    UserRouteTypes["/user/is-phonenumber-available"]["GET"]["query"]
  >,
  Response<UserRouteTypes["/user/is-phonenumber-available"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ query: req.query });

  validators.validate.query.phoneNumber.isString();

  validators.resolveErrors();

  return next();
};
