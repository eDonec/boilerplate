import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ISelectOption } from "forms/Select";

import {
  PaginatedResponse,
  SortDirection,
} from "components/DataTable/ControlledDataTable/types";

import { emptyPaginationResponse } from "../constants";
import { FetchFunction } from "../types";
import { isSortDirection } from "../utils";

export const useUncontrolledDataTable = <T>(
  fetchFunction: FetchFunction<T>
) => {
  const [data, setData] = useState<PaginatedResponse<T>>(
    emptyPaginationResponse
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const { limit, page, sortField, sortDirection } = useMemo(
    () => ({
      page: Math.max(Number(searchParams.get("page")), 1),
      limit: Math.max(Number(searchParams.get("limit")), 1),
      sortField: searchParams.get("sortField"),
      sortDirection: searchParams.get("sortDirection"),
    }),
    [searchParams]
  );

  useEffect(() => {
    (async () => {
      try {
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
    })();
  }, [limit, page, sortField, sortDirection]);

  const onPageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
  };

  const onLimitChange = (newLimit: ISelectOption<string>) => {
    searchParams.set("limit", newLimit.value);
    setSearchParams(searchParams);
  };

  const onSortChange = ({
    field,
    direction,
  }: {
    field: string;
    direction: SortDirection;
  }) => {
    searchParams.set("sortDirection", `${direction}`);
    searchParams.set("sortField", `${field}`);
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
  };
};
