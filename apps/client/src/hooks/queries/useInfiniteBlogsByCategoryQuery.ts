import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import Api from "api";
import { BlogInPaginatedResponse } from "blogs-types/routes/blogs";
import { IPaginatedResult } from "shared-types";

import { QueryKeys } from "constants/queryKeys";

export const useInfiniteBlogsByCategoryQuery = (
  categorySlug?: string,
  options?: UseInfiniteQueryOptions<
    IPaginatedResult<BlogInPaginatedResponse>,
    unknown,
    IPaginatedResult<BlogInPaginatedResponse>,
    IPaginatedResult<BlogInPaginatedResponse>,
    [string, string | undefined]
  >
) => {
  return useInfiniteQuery({
    ...(options || {}),
    queryKey: [QueryKeys.BLOGS, categorySlug],
    queryFn: ({ pageParam }) => {
      return Api.blogsSDK.getByCategory({
        query: {
          page: pageParam,
          slug: categorySlug,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) return lastPage.page + 1;
    },
  });
};
