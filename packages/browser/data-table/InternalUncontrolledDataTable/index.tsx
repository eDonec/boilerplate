import { useUncontrolledDataTable } from "./hooks/useUncontrolledDataTable";
import { InternalUncontrolledDataTableProps } from "./types";
import ControlledDataTable from "../ControlledDataTable";

const InternalUncontrolledDataTable = <T,>({
  fetchFunction,
  searchParams,
  setSearchParams,
  initialValue,
  handle,
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
    keyword,
    onKeywordChange,
  } = useUncontrolledDataTable({
    fetchFunction,
    searchParams,
    setSearchParams,
    initialValue,
    handle,
  });

  return (
    <ControlledDataTable
      {...datatableProps}
      keyword={keyword}
      onKeywordChange={onKeywordChange}
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
