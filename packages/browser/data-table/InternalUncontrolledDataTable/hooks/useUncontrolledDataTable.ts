import { useMemo, useState } from "react";

import { useFirstMount } from "core-hooks";
import { IPaginatedResult } from "shared-types/IPaginatedResult";
import { SortDirection } from "shared-types/SortDirection";

import {
  emptyPaginationResponse,
  FIRST_PAGE,
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

  const firstMount = useFirstMount();
  const syncData = async (_searchParams: URLSearchParams) => {
    const { limit, page, sortField, sortDirection } =
      extractQueryParams(_searchParams);

    try {
      setLoading(true);
      const newData = await fetchFunction({
        page,
        limit,
        "sort-field": sortField || undefined,
        "sort-direction": isSortDirection(sortDirection)
          ? sortDirection
          : undefined,
      });

      setData(newData);
    } catch (error) {
      onFetchError?.(error);
    }
    setLoading(false);
  };

  if (firstMount && !initialValue) {
    syncData(searchParams);
  }

  const onPageChange = (newPage: number) => {
    searchParams.set(UncontrolledDataTableURLParams.PAGE, newPage.toString());
    setSearchParams(searchParams);
    syncData(searchParams);
  };

  const { limit, sortField, sortDirection } = useMemo(
    () => extractQueryParams(searchParams),
    [searchParams]
  );
  const onLimitChange = (newLimit: number) => {
    if (newLimit === Number(limit)) return;
    searchParams.set(UncontrolledDataTableURLParams.LIMIT, `${newLimit}`);
    searchParams.set(UncontrolledDataTableURLParams.PAGE, FIRST_PAGE);

    setSearchParams(searchParams);
    syncData(searchParams);
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
    syncData(searchParams);
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
