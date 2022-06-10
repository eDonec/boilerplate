import Input from "forms/Input/RawInput";

import { BaseDataTable } from "data-table";

import { RoleFormProps } from "./types";
import { useRoleForm } from "./useRoleForm";

const RoleForm = (props: RoleFormProps) => {
  const {
    ressources,
    columns,
    highlightDisabledRessources,
    onTitleChange,
    isFormReadOnly,
  } = useRoleForm(props);

  return (
    <>
      <Input
        label="Title"
        type="text"
        name="name"
        placeholder="Title"
        value={props.role?.name}
        onChange={onTitleChange}
        disabled={isFormReadOnly}
        error={
          props.checkErrors && !props.role?.name?.trim()
            ? "Title is required"
            : undefined
        }
      />
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
        Access Ressources
      </label>
      <BaseDataTable
        conditionalRowClassName={highlightDisabledRessources}
        data={ressources}
        columns={columns}
        keyExtractor={({ item }) => item.title}
      />
    </>
  );
};

export default RoleForm;
