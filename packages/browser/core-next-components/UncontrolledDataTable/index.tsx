import { useRouter } from "next/router";

import InternalUncontrolledDataTable from "data-table/InternalUncontrolledDataTable";

import { UncontrolledDataTableProps } from "./types";

const UncontrolledDataTable = <T,>(props: UncontrolledDataTableProps<T>) => {
  const router = useRouter();

  return (
    <InternalUncontrolledDataTable
      {...props}
      searchParams={
        new URLSearchParams(
          Object.fromEntries(Object.entries(router.query)) as Record<
            string,
            string
          >
        )
      }
      setSearchParams={(params) =>
        router.push(`?${params.toString()}`, undefined, { shallow: true })
      }
    />
  );
};

export default UncontrolledDataTable;
