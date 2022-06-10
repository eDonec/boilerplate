import { LeanRoleDocument } from "auth-types/models/Role";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

export const accessPageColumns: DataTableColumn<
  Omit<LeanRoleDocument, "access"> & { isDeletable: boolean }
>[] = [
  {
    selector: "name",
    title: "Role",
  },
  {
    cell: ({ _id, isDeletable, isDefault }) => (
      <div className="flex justify-end gap-2">
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.ROLE}
        >
          <ButtonLink to={`edit/${_id}`} warning>
            Edit
          </ButtonLink>
        </AccessProtectedWrapper>
        <ButtonLink to={`${_id}`} primary>
          View
        </ButtonLink>
        {!isDefault && isDeletable && (
          <AccessProtectedWrapper
            privileges={PRIVILEGE.DELETE}
            ressource={ACCESS_RESSOURCES.ROLE}
          >
            <Button danger>Delete</Button>
          </AccessProtectedWrapper>
        )}
      </div>
    ),
    title: " ",
    sortable: false,
  },
];
