import { useEffect, useMemo, useState } from "react";

import { useFirstMount } from "core-hooks";
import { IPaginatedResult } from "shared-types/IPaginatedResult";
import { SortDirection } from "shared-types/SortDirection";

import {
  emptyPaginationResponse,
  UncontrolledDataTableURLParams,
} from "../constants";
import { InternalUncontrolledDataTableProps } from "../types";
import { extractQueryParams, isSortDirection } from "../utils";

export const useUncontrolledDataTable = <T>({
  fetchFunction,
  searchParams,
  setSearchParams,
  onFetchError,
  initialValue,
}: Pick<
  InternalUncontrolledDataTableProps<T>,
  | "fetchFunction"
  | "searchParams"
  | "setSearchParams"
  | "onFetchError"
  | "initialValue"
>) => {
  const [data, setData] = useState<IPaginatedResult<T>>(
    initialValue || emptyPaginationResponse
  );
  const [loading, setLoading] = useState(!initialValue);
  const { limit, page, sortField, sortDirection } = useMemo(
    () => extractQueryParams(searchParams),
    [searchParams]
  );
  const firstMount = useFirstMount();

  useEffect(() => {
    (async () => {
      if (firstMount && initialValue) {
        return;
      }
      try {
        setLoading(true);
        const newData = await fetchFunction({
          page,
          limit,
          sortField: sortField || undefined,
          sortDirection: isSortDirection(sortDirection)
            ? sortDirection
            : undefined,
        });

        setData(newData);
      } catch (error) {
        onFetchError?.(error);
      }
      setLoading(false);
    })();
  }, [limit, page, sortField, sortDirection]);

  const onPageChange = (newPage: number) => {
    searchParams.set(UncontrolledDataTableURLParams.PAGE, newPage.toString());
    setSearchParams(searchParams);
  };

  const onLimitChange = (newLimit: number) => {
    searchParams.set(UncontrolledDataTableURLParams.LIMIT, `${newLimit}`);
    setSearchParams(searchParams);
  };

  const onSortChange = ({
    field,
    direction,
  }: {
    field: string;
    direction: SortDirection;
  }) => {
    searchParams.set(
      UncontrolledDataTableURLParams.SORT_DIRECTION,
      `${direction}`
    );
    searchParams.set(UncontrolledDataTableURLParams.SORT_FIELD, `${field}`);
    setSearchParams(searchParams);
  };

  const currentSort = useMemo(
    () =>
      sortField && isSortDirection(sortDirection)
        ? {
            field: sortField,
            direction: sortDirection,
          }
        : undefined,
    [sortField, sortDirection]
  );

  return {
    onPageChange,
    onSortChange,
    onLimitChange,
    data,
    currentSort,
    limit,
    loading,
  };
};
