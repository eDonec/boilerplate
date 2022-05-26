import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { DEFAULT_DATATABLE_LIMIT } from "components/DataTable/ControlledDataTable/defaults";
import {
  PaginatedResponse,
  SortDirection,
} from "components/DataTable/ControlledDataTable/types";

import {
  emptyPaginationResponse,
  UncontrolledDataTableURLParams,
} from "../constants";
import { FetchFunction } from "../types";
import { isSortDirection } from "../utils";

export const useUncontrolledDataTable = <T>(
  fetchFunction: FetchFunction<T>
) => {
  const [data, setData] = useState<PaginatedResponse<T>>(
    emptyPaginationResponse
  );
  const [searchParams, setSearchParams] = useSearchParams();
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
        // eslint-disable-next-line no-console
        console.error(error);
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
