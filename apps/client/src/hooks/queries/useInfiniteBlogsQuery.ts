import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import Api from "api";
import { BlogInPaginatedResponse } from "blogs-types/routes/blogs";
import { IPaginatedResult } from "shared-types";

import { QueryKeys } from "constants/queryKeys";

export const useInfiniteBlogsQuery = (
  options: UseInfiniteQueryOptions<
    IPaginatedResult<BlogInPaginatedResponse>,
    unknown,
    IPaginatedResult<BlogInPaginatedResponse>,
    IPaginatedResult<BlogInPaginatedResponse>,
    [string]
  > = {}
) => {
  return useInfiniteQuery({
    ...options,
    queryKey: [QueryKeys.BLOGS],
    queryFn: ({ pageParam }) => {
      return Api.blogsSDK.getBlogs({
        query: {
          page: pageParam,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) return lastPage.page + 1;
    },
  });
};
