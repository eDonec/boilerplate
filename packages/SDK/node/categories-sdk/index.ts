import { CategoryRouteTypes } from "categories-types/routes/category";
import { HealthRouteTypes } from "categories-types/routes/health";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";

const baseUrl = "/v1/categories";

export default class CategoriesSDK extends ServerSDK {
  public async getMicroservicesStatus() {
    const { data } = await this.api.get<
      HealthRouteTypes["/health/"]["GET"]["response"]
    >(`${baseUrl}/health`);

    return data;
  }

  public async addCategory({
    body,
  }: {
    body: CategoryRouteTypes["/category/"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      CategoryRouteTypes["/category/"]["POST"]["response"]
    >(`${baseUrl}/category/`, body);

    return data;
  }

  public async updateCategory({
    body,
    params,
  }: {
    body: CategoryRouteTypes["/category/:id"]["PUT"]["body"];
    query?: never;
    params: CategoryRouteTypes["/category/:id"]["PUT"]["params"];
  }) {
    const { data } = await this.api.put<
      CategoryRouteTypes["/category/:id"]["PUT"]["response"]
    >(`${baseUrl}/category/${params.id}`, body);

    return data;
  }

  public async deleteCategory({
    params,
  }: {
    body?: never;
    query?: never;
    params: CategoryRouteTypes["/category/:id"]["DELETE"]["params"];
  }) {
    const { data } = await this.api.delete<
      CategoryRouteTypes["/category/:id"]["DELETE"]["response"]
    >(`${baseUrl}/category/${params.id}`);

    return data;
  }

  public async getCategory({
    params,
  }: {
    body?: never;
    query?: never;
    params: CategoryRouteTypes["/category/:id"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/:id"]["GET"]["response"]
    >(`${baseUrl}/category/${params.id}`);

    return data;
  }

  public async getCategories({
    query,
  }: {
    body?: never;
    query: CategoryRouteTypes["/category/"]["GET"]["query"];
    params?: never;
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/"]["GET"]["response"]
    >(`${baseUrl}/category/`, { params: query });

    return data;
  }

  public async getUnpaginatedCategories(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/unpaginated"]["GET"]["response"]
    >(`${baseUrl}/category/unpaginated`);

    return data;
  }

  public async getBulk({
    body,
  }: {
    body: CategoryRouteTypes["/category/bulk"]["GET"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/bulk"]["GET"]["response"]
    >(`${baseUrl}/category/bulk`, {
      data: body,
    });

    return data;
  }

  public async getIdBySlug({
    params,
  }: {
    body?: never;
    query?: never;
    params: CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["response"]
    >(`${baseUrl}/category/id-by-slug/${params.slug}`);

    return data;
  }

  public async getStaticPaths(_args: {
    body?: never;
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/static-paths"]["GET"]["response"]
    >(`${baseUrl}/category/static-paths`);

    return data;
  }

  public async getBySlug({
    params,
  }: {
    body?: never;
    query?: never;
    params: CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["response"]
    >(`${baseUrl}/category/by-slug/${params.slug}`);

    return data;
  }
}

export type CategoriesSDKTypes = ServerSDKTypes<CategoriesSDK>;
