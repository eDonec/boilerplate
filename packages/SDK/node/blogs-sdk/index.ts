import { BlogsRouteTypes } from "blogs-types/routes/blogs";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";

const baseUrl = "/v1/blogs";

export default class BlogsSDK extends ServerSDK {
  public async getBlogs({
    query,
  }: {
    body?: never;
    query: BlogsRouteTypes["/blogs/"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/"]["GET"]["response"]
    >(`${baseUrl}/blogs/`, { params: query });

    return data;
  }

  public async addBlog({
    body,
  }: {
    body: BlogsRouteTypes["/blogs/"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      BlogsRouteTypes["/blogs/"]["POST"]["response"]
    >(`${baseUrl}/blogs/`, body);

    return data;
  }

  public async getBlogBySlug({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/:slug"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/:slug"]["GET"]["response"]
    >(`${baseUrl}/blogs/${params.slug}`);

    return data;
  }

  public async updateBlogBySlug({
    body,
    params,
  }: {
    body: BlogsRouteTypes["/blogs/:slug"]["PUT"]["body"];
    query?: never;
    params: BlogsRouteTypes["/blogs/:slug"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      BlogsRouteTypes["/blogs/:slug"]["PUT"]["response"]
    >(`${baseUrl}/blogs/${params.slug}`, body);

    return data;
  }

  public async deleteBlogBySlug({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/:slug"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      BlogsRouteTypes["/blogs/:slug"]["DELETE"]["response"]
    >(`${baseUrl}/blogs/${params.slug}`);

    return data;
  }

  public async getBlogsStaticPaths(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/static-paths"]["GET"]["response"]
    >(`${baseUrl}/blogs/static-paths`);

    return data;
  }

  public async getGrouped(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/grouped"]["GET"]["response"]
    >(`${baseUrl}/blogs/grouped`);

    return data;
  }

  public async getByCategory({
    query,
  }: {
    body?: never;
    query: BlogsRouteTypes["/blogs/by-category"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/by-category"]["GET"]["response"]
    >(`${baseUrl}/blogs/by-category`, { params: query });

    return data;
  }

  public async clapBlog({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      BlogsRouteTypes["/blogs/clap/:slug"]["PUT"]["response"]
    >(`${baseUrl}/blogs/clap/${params.slug}`);

    return data;
  }

  public async upvoteBlog({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      BlogsRouteTypes["/blogs/upvote/:slug"]["PUT"]["response"]
    >(`${baseUrl}/blogs/upvote/${params.slug}`);

    return data;
  }

  public async downvoteBlog({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      BlogsRouteTypes["/blogs/downvote/:slug"]["PUT"]["response"]
    >(`${baseUrl}/blogs/downvote/${params.slug}`);

    return data;
  }

  public async removeUserVoteFromBlog({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      BlogsRouteTypes["/blogs/remove-vote/:slug"]["PUT"]["response"]
    >(`${baseUrl}/blogs/remove-vote/${params.slug}`);

    return data;
  }

  public async getFeaturedBlogs(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/featured"]["GET"]["response"]
    >(`${baseUrl}/blogs/featured`);

    return data;
  }

  public async getBlogScore({
    params,
  }: {
    body?: never;
    query?: never;
    params: BlogsRouteTypes["/blogs/score/:slug"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      BlogsRouteTypes["/blogs/score/:slug"]["GET"]["response"]
    >(`${baseUrl}/blogs/score/${params.slug}`);

    return data;
  }
}

export type BlogsSDKTypes = ServerSDKTypes<BlogsSDK>;
