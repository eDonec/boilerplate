import { IPaginatedResult, TextDirection } from "shared-types";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { LeanBlogDocument } from "../models/Blog";

export type BlogInPaginatedResponse = Omit<
  LeanBlogDocument,
  "upvotes" | "downvotes"
> & {
  upvotes: number;
  downvotes: number;
};

export type BlogInResponse = Omit<LeanBlogDocument, "upvotes" | "downvotes"> & {
  isUpvotedByUser: boolean;
  isDownvotedByUser: boolean;
  upvotes: number;
  downvotes: number;
};
export type BlogsRouteTypes = {
  "/blogs/": {
    GET: {
      query: {
        "sort-direction"?: string;
        page?: string;
        "sort-field"?: string;
        limit?: string;
        keyword?: string;
      };
      response: IPaginatedResult<BlogInPaginatedResponse>;
    };
    POST: {
      body: Omit<LeanBlogDocument, "slug" | "upvotes" | "downvotes" | "claps">;
      response: string;
    };
  };
  "/blogs/:slug": {
    GET: {
      response: {
        blog: BlogInResponse & { nextLink: string; previousLink: string };
        relatedBlogs: BlogInPaginatedResponse[];
      };
      params: {
        slug: string;
      };
    };
    PUT: {
      body: {
        banner?: {
          key: string;
          type: string;
          name: string;
          _id: string;
          url: string;
        };
        title?: string;
        description?: string;
        metaDescription?: string;
        content?: string;
        secondaryCategories?: string[];
        maincategory?: string;
        textDirection?: TextDirection;
      };

      response: {
        slug: string;
      };
      params: {
        slug: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        slug: string;
      };
    };
  };
  "/blogs/static-paths": {
    GET: {
      response: Array<string>;
    };
  };
  "/blogs/grouped": {
    GET: {
      response: {
        recents: BlogInPaginatedResponse[];
        categories: Array<{
          category: {
            _id: string;
            title: string;
            description: string;
            slug: string;
          };
          items: Array<BlogInPaginatedResponse>;
        }>;
      };
    };
  };
  "/blogs/by-category": {
    GET: {
      query: {
        page?: string;
        limit?: string;
        slug?: string;
      };
      response: IPaginatedResult<BlogInPaginatedResponse>;
    };
  };
  "/blogs/upvote/:slug": {
    PUT: {
      response: string;
      params: {
        slug: string;
      };
    };
  };
  "/blogs/downvote/:slug": {
    PUT: {
      response: string;
      params: {
        slug: string;
      };
    };
  };
  "/blogs/clap/:slug": {
    PUT: {
      response: string;
      params: {
        slug: string;
      };
    };
  };
  "/blogs/remove-vote/:slug": {
    PUT: {
      response: string;
      params: {
        slug: string;
      };
    };
  };
  "/blogs/featured": {
    GET: {
      response: {
        items: Array<BlogInPaginatedResponse>;
        categories: Array<LeanCategoryDocument>;
      };
    };
  };
  "/blogs/score/:slug": {
    GET: {
      response: {
        upvotes: number;
        downvotes: number;
        claps: number;
        isUpvotedByUser: boolean;
        isDownvotedByUser: boolean;
      };
      params: {
        slug: string;
      };
    };
  };
};
