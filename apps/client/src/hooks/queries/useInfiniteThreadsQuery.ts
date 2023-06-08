import { useInfiniteQuery } from "@tanstack/react-query";
import Api from "api";
import { ThreadSorting } from "threads-types/utils";

import { QueryKeys } from "constants/queryKeys";

export const useInfiniteThreadsQuery = ({
  sortType = ThreadSorting.HOT,
  category,
}: {
  sortType?: ThreadSorting;
  category?: string;
}) => {
  return useInfiniteQuery({
    queryKey: [QueryKeys.THREADS, sortType, category],
    queryFn: ({ pageParam }) => {
      return Api.threadsSDK.getThreads({
        query: {
          page: pageParam,
          "sort-type": sortType,
          category,
        },
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) return lastPage.page + 1;
    },
  });
};
