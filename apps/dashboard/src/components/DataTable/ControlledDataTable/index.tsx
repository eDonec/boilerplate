import FlatList, { ListRenderItem } from "components/FlatList";

import { DataTableProvider } from "./context/DataTableContext";
import { useDataTable } from "./hooks/useDataTable";
import DataTableFooter from "./inner-components/DataTableFooter";
import DataTableHeader from "./inner-components/DataTableHeader";
import DataTableRow from "./inner-components/DataTableRow";
import { ControlledDataTableProps } from "../types";

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
