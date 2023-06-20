import { BlogsRouteTypes } from "blogs-types/routes/blogs";
import { Request, Response } from "http-server";
import * as blogsService from "services/blogs";
import { IMiddleware, StatusCodes } from "shared-types";
import { TCurrentAuthLocals } from "token/currentAuthLocals";

export const getBlogs: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/"]["GET"]["query"]
  >,
  Response<BlogsRouteTypes["/blogs/"]["GET"]["response"]>
> = async (req, res) => {
  const response = await blogsService.getBlogs(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const addBlog: IMiddleware<
  Request<
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/"]["POST"]["body"],
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/"]["POST"]["response"]>
> = async (req, res) => {
  await blogsService.addBlog(req.body);

  res.status(StatusCodes.Created).send("OK");
};

export const getBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<
    BlogsRouteTypes["/blogs/:slug"]["GET"]["response"],
    Partial<TCurrentAuthLocals>
  >
> = async (req, res) => {
  const response = await blogsService.getBlogBySlug(
    req.params.slug,
    res.locals.token?.decodedToken.payload.authId
  );

  res.status(StatusCodes.OK).send(response);
};

export const updateBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["PUT"]["params"],
    unknown,
    BlogsRouteTypes["/blogs/:slug"]["PUT"]["body"],
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/:slug"]["PUT"]["response"]>
> = async (req, res) => {
  const response = await blogsService.updateBlogBySlug(
    req.params.slug,
    req.body
  );

  res.status(StatusCodes.OK).send(response);
};

export const deleteBlogBySlug: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/:slug"]["DELETE"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/:slug"]["DELETE"]["response"]>
> = async (req, res) => {
  await blogsService.deleteBlogBySlug(req.params.slug);

  res.status(StatusCodes.OK).send("OK");
};

export const getBlogsStaticPaths: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<BlogsRouteTypes["/blogs/static-paths"]["GET"]["response"]>
> = async (_, res) => {
  const response = await blogsService.getBlogsStaticPaths();

  res.status(StatusCodes.OK).send(response);
};

export const getGrouped: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<BlogsRouteTypes["/blogs/grouped"]["GET"]["response"]>
> = async (_, res) => {
  const response = await blogsService.getGrouped();

  res.status(StatusCodes.OK).send(response);
};

export const getByCategory: IMiddleware<
  Request<
    unknown,
    unknown,
    unknown,
    BlogsRouteTypes["/blogs/by-category"]["GET"]["query"]
  >,
  Response<BlogsRouteTypes["/blogs/by-category"]["GET"]["response"]>
> = async (req, res) => {
  const response = await blogsService.getByCategory(req.query);

  res.status(StatusCodes.OK).send(response);
};

export const upvoteBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<
    BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["response"],
    TCurrentAuthLocals
  >
> = async (req, res) => {
  await blogsService.upvoteBlog(
    req.params.slug,
    res.locals.token.decodedToken.payload.authId
  );

  res.status(StatusCodes.OK).send("OK");
};

export const downvoteBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<
    BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["response"],
    TCurrentAuthLocals
  >
> = async (req, res) => {
  await blogsService.downvoteBlog(
    req.params.slug,
    res.locals.token.decodedToken.payload.authId
  );

  res.status(StatusCodes.OK).send("OK");
};

export const clapBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["response"]>
> = async (req, res) => {
  await blogsService.clapBlog(req.params.slug);

  res.status(StatusCodes.OK).send("OK");
};

export const removeUserVoteFromBlog: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<
    BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["response"],
    TCurrentAuthLocals
  >
> = async (req, res) => {
  await blogsService.removeUserVoteFromBlog(
    req.params.slug,
    res.locals.token.decodedToken.payload.authId
  );

  res.status(StatusCodes.OK).send("OK");
};

export const getFeaturedBlogs: IMiddleware<
  Request<unknown, unknown, unknown, unknown>,
  Response<BlogsRouteTypes["/blogs/featured"]["GET"]["response"]>
> = async (_, res) => {
  const response = await blogsService.getFeaturedBlogs();

  res.status(StatusCodes.OK).send(response);
};

export const getBlogScore: IMiddleware<
  Request<
    BlogsRouteTypes["/blogs/score/:slug"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >,
  Response<
    BlogsRouteTypes["/blogs/score/:slug"]["GET"]["response"],
    Partial<TCurrentAuthLocals>
  >
> = async (req, res) => {
  const response = await blogsService.getBlogScore(
    req.params.slug,
    res.locals.token?.decodedToken.payload.authId
  );

  res.status(StatusCodes.OK).send(response);
};
