import { useUncontrolledDataTable } from "./hooks/useUncontrolledDataTable";
import { InternalUncontrolledDataTableProps } from "./types";
import ControlledDataTable from "../ControlledDataTable";

const InternalUncontrolledDataTable = <T,>({
  fetchFunction,
  searchParams,
  setSearchParams,
  initialValue,
  ...datatableProps
}: InternalUncontrolledDataTableProps<T>) => {
  const {
    data,
    onPageChange,
    onLimitChange,
    onSortChange,
    currentSort,
    limit,
    loading,
  } = useUncontrolledDataTable({
    fetchFunction,
    searchParams,
    setSearchParams,
    initialValue,
  });

  return (
    <ControlledDataTable
      {...datatableProps}
      data={data}
      onPageChange={onPageChange}
      onSortChange={onSortChange}
      onLimitChange={onLimitChange}
      currentSort={currentSort}
      limit={limit}
      loading={loading}
    />
  );
};

export default InternalUncontrolledDataTable;
