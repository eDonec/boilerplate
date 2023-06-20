import { UploadedBucketFileResponse } from "shared-types";

import { LeanCategoryDocument } from "../models/Category";

export type CategoryRouteTypes = {
  "/category/": {
    POST: {
      body: {
        title: string;
        image: UploadedBucketFileResponse;
        description: string;
        artisticTitle?: string;
      };

      response: string;
    };
    GET: {
      query: {
        page?: string;
        limit?: string;
        "sort-direction"?: string;
        "sort-field"?: string;
        keyword?: string;
      };
      response: {
        items: Array<LeanCategoryDocument>;
        page: number;
        hasNextPage: boolean;
        totalItems: number;
        totalPages: number;
      };
    };
  };
  "/category/:id": {
    PUT: {
      body: {
        title?: string;
        description?: string;
        image?: UploadedBucketFileResponse;
        artisticTitle?: string;
      };

      response: string;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
    GET: {
      response: LeanCategoryDocument;
      params: {
        id: string;
      };
    };
  };
  "/category/unpaginated": {
    GET: {
      response: Array<LeanCategoryDocument>;
    };
  };
  "/category/bulk": {
    GET: {
      body: {
        ids: Array<string>;
      };

      response: Array<LeanCategoryDocument>;
    };
  };
  "/category/id-by-slug/:slug": {
    GET: {
      response: {
        id: string;
      };
      params: {
        slug: string;
      };
    };
  };
  "/category/static-paths": {
    GET: {
      response: Array<{
        params: {
          slug: string;
        };
      }>;
    };
  };
  "/category/by-slug/:slug": {
    GET: {
      response: LeanCategoryDocument;
      params: {
        slug: string;
      };
    };
  };
};
