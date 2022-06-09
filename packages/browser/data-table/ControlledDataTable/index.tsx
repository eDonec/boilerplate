import { Loader } from "core-ui";
import { clsx } from "core-utils";

import { DataTableProvider } from "./context/DataTableContext";
import DataTableFooter from "./inner-components/DataTableFooter";
import { ControlledDataTableProps } from "./types";
import BaseDataTable from "../BaseDataTable";

const ControlledDataTable = <T,>(props: ControlledDataTableProps<T>) => {
  const { data, loading } = props;

  return (
    <DataTableProvider {...props}>
      <div className="relative">
        <BaseDataTable
          {...props}
          data={data.items}
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
