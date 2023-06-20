import { BlogsRouteTypes } from "blogs-types/routes/blogs";
import FieldValidator from "field-validator";
import { Request, Response } from "http-server";
import { IMiddleware, SortDirection } from "shared-types";

export const getBlogs: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/"]["GET"]["query"]
  >,
  Response<BlogsRouteTypes["/blogs/"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ query: req.query });

  validators.validate.query.page?.isString();
  validators.validate.query.limit?.isString();
  validators.validate.query["sort-field"]?.isString();
  validators.validate.query["sort-direction"]
    ?.isString()
    .isInArrayOfStrings(Object.values(SortDirection));
  validators.validate.query.keyword?.isString();

  validators.resolveErrors();

  return next();
};

export const addBlog: IMiddleware<
  Request<
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/"]["POST"]["body"],
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/"]["POST"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body });

  validators.validate.body.banner.key.isString();
  validators.validate.body.banner.type.isString();
  validators.validate.body.banner.name.isString();
  validators.validate.body.banner._id.isString();
  validators.validate.body.banner.url.isString();
  validators.validate.body.title.isString();
  validators.validate.body.description.isString();
  validators.validate.body.metaDescription.isString();
  validators.validate.body.content.isString();
  validators.validate.body.mainCategory.isString();
  validators.validate.body.secondaryCategories.forEach((el) => {
    el.isString().isValidObjectId();
  });

  validators.resolveErrors();

  return next();
};

export const getBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/:slug"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const updateBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["PUT"]["params"],
    unknown,
    BlogsRouteTypes["/blogs/:slug"]["PUT"]["body"],
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/:slug"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ body: req.body, params: req.params });

  validators.validate.body.banner?.key.isString();
  validators.validate.body.banner?.type.isString();
  validators.validate.body.banner?.name.isString();
  validators.validate.body.banner?._id.isString();
  validators.validate.body.banner?.url.isString();
  validators.validate.body.title?.isString();
  validators.validate.body.description?.isString();
  validators.validate.body.metaDescription?.isString();
  validators.validate.body.content?.isString();
  validators.validate.body.maincategory?.isString();
  validators.validate.body.secondaryCategories?.forEach((el) => {
    el.isString().isValidObjectId();
  });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const deleteBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/:slug"]["DELETE"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const getByCategory: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/by-category"]["GET"]["query"]
  >,
  Response<BlogsRouteTypes["/blogs/by-category"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({
    params: req.params,
    query: req.query,
  });

  validators.validate.query.page?.isNumber();
  validators.validate.query.limit?.isNumber();
  validators.validate.query.slug?.isString();

  validators.resolveErrors();

  return next();
};

export const upvoteBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const downvoteBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const clapBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const removeUserVoteFromBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};

export const getBlogScore: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/score/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/score/:slug"]["GET"]["response"]>
> = (req, _, next) => {
  const validators = new FieldValidator({ params: req.params });

  validators.validate.params.slug.isString();

  validators.resolveErrors();

  return next();
};
