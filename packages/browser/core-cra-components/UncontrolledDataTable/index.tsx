import { useSearchParams } from "react-router-dom";

import InternalUncontrolledDataTable from "data-table/InternalUncontrolledDataTable";

import { UncontrolledDataTableProps } from "./types";

const UncontrolledDataTable = <T,>(props: UncontrolledDataTableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <InternalUncontrolledDataTable
      {...props}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />
  );
};

export default UncontrolledDataTable;
