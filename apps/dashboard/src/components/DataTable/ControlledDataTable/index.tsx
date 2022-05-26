import { Loader } from "core-ui";
import { clsx } from "core-utils";

import FlatList, { ListRenderItem } from "components/FlatList";

import { DataTableProvider } from "./context/DataTableContext";
import { useDataTable } from "./hooks/useDataTable";
import DataTableFooter from "./inner-components/DataTableFooter";
import DataTableHeader from "./inner-components/DataTableHeader";
import DataTableRow from "./inner-components/DataTableRow";
import { ControlledDataTableProps } from "./types";

const ControlledDataTable = <T,>(props: ControlledDataTableProps<T>) => {
  const { data, columns, loading, ...rest } = props;
  const { headerItems } = useDataTable(columns);
  const renderRow: ListRenderItem<T> = ({ item, index }) => (
    <DataTableRow item={item} index={index} />
  );

  return (
    <DataTableProvider {...props}>
      <div className="relative">
        <FlatList
          {...rest}
          data={data.items}
          renderItem={renderRow}
          renderListHeader={<DataTableHeader headerItems={headerItems} />}
          renderListFooter={<DataTableFooter />}
        />
        <div
          className={clsx([
            "absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-opacity-5 backdrop-blur transition-opacity",
            {
              "pointer-events-none opacity-0": !loading,
            },
          ])}
        >
          <Loader
            className={clsx({
              hidden: !loading,
            })}
          />
        </div>
      </div>
    </DataTableProvider>
  );
};

export default ControlledDataTable;
