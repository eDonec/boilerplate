import Input from "forms/Input/RawInput";

import AccessRessourcesDataTable from "containers/AccessRessourcesDataTable";

import { RoleFormProps } from "./types";
import { useRoleForm } from "./useRoleForm";

const RoleForm = (props: RoleFormProps) => {
  const { onTitleChange, isFormReadOnly, onAccessChange, baseAccess } =
    useRoleForm(props);

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
      <AccessRessourcesDataTable
        label="Access Ressources"
        access={props.role?.access || []}
        onAccessChange={onAccessChange}
        baseAccess={baseAccess}
      />
    </>
  );
};

export default RoleForm;
