import { CategoryRouteTypes } from "categories-types/routes/category";
import { Request, Response } from "http-server";
import * as categoryService from "services/category";
import { IMiddleware, StatusCodes } from "shared-types";

export const addCategory: IMiddleware<
  Request<
    unknown,
    unknown,
    CategoryRouteTypes["/category/"]["POST"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/"]["POST"]["response"]>
> = async (req, res) => {
  await categoryService.addCategory(req.body);

  res.status(StatusCodes.Created).send("OK");
};

export const updateCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["PUT"]["params"],
    unknown,
    CategoryRouteTypes["/category/:id"]["PUT"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["PUT"]["response"]>
> = async (req, res) => {
  await categoryService.updateCategory(req.params.id, req.body);

  res.status(StatusCodes.OK).send("OK");
};

export const deleteCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["DELETE"]["response"]>
> = async (req, res) => {
  await categoryService.deleteCategory(req.params.id);

  res.status(StatusCodes.OK).send("OK");
};

export const getCategory: IMiddleware<
  Request<
    CategoryRouteTypes["/category/:id"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/:id"]["GET"]["response"]>
> = async (req, res) => {
  const response = await categoryService.getCategory(req.params.id);

  res.status(StatusCodes.OK).send(response);
};

export const getCategories: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    CategoryRouteTypes["/category/"]["GET"]["query"]
  >,
  Response<CategoryRouteTypes["/category/"]["GET"]["response"]>
> = async (req, res) => {
  const response = await categoryService.getCategories(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const getUnpaginatedCategories: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<CategoryRouteTypes["/category/unpaginated"]["GET"]["response"]>
> = async (_, res) => {
  const response = await categoryService.getUnpaginatedCategories();

  res.status(StatusCodes.OK).send(response);
};

export const getBulk: IMiddleware<
  Request<
    unknown,
    unknown,
    CategoryRouteTypes["/category/bulk"]["GET"]["body"],
    unknown
  >,
  Response<CategoryRouteTypes["/category/bulk"]["GET"]["response"]>
> = async (req, res) => {
  const response = await categoryService.getBulk(req.body.ids);

  res.status(StatusCodes.OK).send(response);
};

export const getIdBySlug: IMiddleware<
  Request<
    CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["response"]>
> = async (req, res) => {
  const response = await categoryService.getIdBySlug(req.params.slug);

  res.status(StatusCodes.OK).send(response);
};

export const getStaticPaths: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<CategoryRouteTypes["/category/static-paths"]["GET"]["response"]>
> = async (_, res) => {
  const response = await categoryService.getStaticPaths();

  res.status(StatusCodes.OK).send(response);
};

export const getBySlug: IMiddleware<
  Request<
    CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["response"]>
> = async (req, res) => {
  const response = await categoryService.getBySlug(req.params.slug);

  res.status(StatusCodes.OK).send(response);
};
