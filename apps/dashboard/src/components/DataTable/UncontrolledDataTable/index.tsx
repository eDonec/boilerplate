import { useUncontrolledDataTable } from "./hooks/useUncontrolledDataTable";
import { UncontrolledDataTableProps } from "./types";
import ControlledDataTable from "../ControlledDataTable";

const UncontrolledDataTable = <T,>({
  fetchFunction,
  ...datatableProps
}: UncontrolledDataTableProps<T>) => {
  const { data, onPageChange, onLimitChange, onSortChange, currentSort } =
    useUncontrolledDataTable(fetchFunction);

  return (
    <ControlledDataTable
      {...datatableProps}
      data={data}
      onPageChange={onPageChange}
      onSortChange={onSortChange}
      onLimitChange={onLimitChange}
      currentSort={currentSort}
    />
  );
};

export default UncontrolledDataTable;
