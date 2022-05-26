import { clsx } from "core-utils";

import FlatList, { ListRenderItem } from "components/FlatList";

import DataTableFooter from "./DataTableFooter";
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import { ControlledDataTableProps } from "./types";
import { useDataTable } from "./useDataTable";

const ControlledDataTable = <T,>({
  data,
  columns,
  headerClassName,
  rowClassName,
  onSortChange,
  currentSort,
  ...flatlistProps
}: ControlledDataTableProps<T>) => {
  const { headerItems } = useDataTable(columns);
  const renderRow: ListRenderItem<T> = ({ item, index }) => (
    <DataTableRow
      className={clsx(rowClassName, {
        "border-b": index !== data.items.length - 1,
      })}
      item={item}
      columns={columns}
    />
  );

  return (
    <FlatList
      {...flatlistProps}
      data={data.items}
      renderItem={renderRow}
      renderListHeader={() => (
        <DataTableHeader
          onSortChange={onSortChange}
          selectedSort={currentSort}
          className={headerClassName}
          headerItems={headerItems}
        />
      )}
      renderListFooter={() => (
        <DataTableFooter
          page={data.page}
          totalPages={data.totalPages}
          totalItems={data.totalItems}
        />
      )}
    />
  );
};

export default ControlledDataTable;
