import FlatList, { ListRenderItem } from "components/FlatList";

import { DataTableProvider } from "./DataTableContext";
import DataTableFooter from "./DataTableFooter";
import DataTableHeader from "./DataTableHeader";
import DataTableRow from "./DataTableRow";
import { ControlledDataTableProps } from "./types";
import { useDataTable } from "./useDataTable";

const ControlledDataTable = <T,>(props: ControlledDataTableProps<T>) => {
  const { data, columns, ...rest } = props;
  const { headerItems } = useDataTable(columns);
  const renderRow: ListRenderItem<T> = ({ item, index }) => (
    <DataTableRow item={item} index={index} />
  );

  return (
    <DataTableProvider {...props}>
      <FlatList
        {...rest}
        data={data.items}
        renderItem={renderRow}
        renderListHeader={() => <DataTableHeader headerItems={headerItems} />}
        renderListFooter={() => <DataTableFooter />}
      />
    </DataTableProvider>
  );
};

export default ControlledDataTable;
