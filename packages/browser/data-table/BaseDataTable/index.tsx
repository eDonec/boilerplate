import { BaseDataTableProvider } from "./context/BaseDataTableContext";
import { useBaseDataTable } from "./hooks/useBaseDataTable";
import DataTableHeader from "./inner-components/DataTableHeader";
import DataTableRow from "./inner-components/DataTableRow";
import { BaseDatatableProps } from "./types";
import FlatList, { ListRenderItem } from "../components/FlatList";

const BaseDataTable = <T,>(props: BaseDatatableProps<T>) => {
  const { data, columns, renderListFooter, ...rest } = props;
  const { headerItems } = useBaseDataTable(columns);
  const renderRow: ListRenderItem<T> = ({ item, index }) => (
    <DataTableRow item={item} index={index} />
  );

  return (
    <BaseDataTableProvider {...props}>
      <FlatList
        {...rest}
        data={data}
        renderItem={renderRow}
        renderListHeader={<DataTableHeader headerItems={headerItems} />}
        renderListFooter={renderListFooter}
      />
    </BaseDataTableProvider>
  );
};

export default BaseDataTable;
