import { BaseDataTable } from "data-table";

import { AccessRessourceDataTableProps } from "./types";
import { useAccessRessourcesDataTable } from "./useAccessRessourcesDataTable";

const AccessRessourcesDataTable = (props: AccessRessourceDataTableProps) => {
  const { ressources, columns, highlightDisabledRessources } =
    useAccessRessourcesDataTable(props);

  return (
    <>
      {props.label && (
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
          {props.label}
        </label>
      )}
      <BaseDataTable
        conditionalRowClassName={highlightDisabledRessources}
        data={ressources}
        columns={columns}
        keyExtractor={({ item }) => item.title}
      />
    </>
  );
};

export default AccessRessourcesDataTable;
