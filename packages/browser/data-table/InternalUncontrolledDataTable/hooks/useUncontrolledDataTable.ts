import { useEffect, useMemo, useState } from "react";

import {
  emptyPaginationResponse,
  UncontrolledDataTableURLParams,
} from "../constants";
import { InternalUncontrolledDataTableProps } from "../types";
import { isSortDirection } from "../utils";
import { DEFAULT_DATATABLE_LIMIT } from "../../ControlledDataTable/defaults";
import {
  PaginatedResponse,
  SortDirection,
} from "../../ControlledDataTable/types";

export const useUncontrolledDataTable = <T>({
  fetchFunction,
  searchParams,
  setSearchParams,
  onFetchError,
}: Pick<
  InternalUncontrolledDataTableProps<T>,
  "fetchFunction" | "searchParams" | "setSearchParams" | "onFetchError"
>) => {
  const [data, setData] = useState<PaginatedResponse<T>>(
    emptyPaginationResponse
  );
  const [loading, setLoading] = useState(true);

  const { limit, page, sortField, sortDirection } = useMemo(
    () => ({
      page: Math.max(
        Number(searchParams.get(UncontrolledDataTableURLParams.PAGE)),
        1
      ),
      limit: Number(searchParams.get(UncontrolledDataTableURLParams.LIMIT))
        ? Math.max(
            Number(searchParams.get(UncontrolledDataTableURLParams.LIMIT)),
            1
          )
        : DEFAULT_DATATABLE_LIMIT,
      sortField: searchParams.get(UncontrolledDataTableURLParams.SORT_FIELD),
      sortDirection: searchParams.get(
        UncontrolledDataTableURLParams.SORT_DIRECTION
      ),
    }),
    [searchParams]
  );

  useEffect(() => {
    (async () => {
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
