import { CategoryRouteTypes } from "categories-types/routes/category";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware } from "shared-types";

export const addCategory: IMiddleware<
  Request<
    unknown,
    unknown,
    CategoryRouteTypes["/category/"]["POST"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/"]["POST"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body });

  validators.validate.body.title.isString();
  validators.validate.body.description.isString();
  validators.validate.body.image.key.isString();
  validators.validate.body.image.type.isString();
  validators.validate.body.image.name.isString();
  validators.validate.body.image._id.isString();
  validators.validate.body.artisticTitle?.isString();

  validators.resolveErrors();

  return next();
};

export const updateCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["PUT"]["params"],
    unknown,
    CategoryRouteTypes["/category/:id"]["PUT"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body, params: req.params });

  validators.validate.body.title?.isString();
  validators.validate.body.description?.isString();
  validators.validate.body.image?.key.isString();
  validators.validate.body.image?.type.isString();
  validators.validate.body.image?.name.isString();
  validators.validate.body.image?._id.isString();
  validators.validate.body.artisticTitle?.isString();

  validators.validate.params.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const deleteCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["DELETE"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const getCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.id.isString().isValidObjectId();

  validators.resolveErrors();

  return next();
};

export const getCategories: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    CategoryRouteTypes["/category/"]["GET"]["query"]
  >,
  Response<CategoryRouteTypes["/category/"]["GET"]["response"]>
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

export const getBulk: IMiddleware<
  Request<
    unknown,
    unknown,
    CategoryRouteTypes["/category/bulk"]["GET"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/bulk"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body });

  validators.validate.body.ids.forEach((o) => {
    o.isString().isValidObjectId();
  });

  validators.resolveErrors();

  return next();
};

export const getIdBySlug: IMiddleware<
  Request<
    CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const getBySlug: IMiddleware<
  Request<
    CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};
