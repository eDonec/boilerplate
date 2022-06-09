import { LeanRoleDocument } from "auth-types/models/Role";
import ButtonLink from "core-cra-components/ButtonLink";

import { DataTableColumn } from "data-table/BaseDataTable/types";

export const accessPageColumns: DataTableColumn<LeanRoleDocument>[] = [
  {
    selector: "name",
    title: "Role",
  },
  {
    cell: ({ _id }) => (
      <div className="flex justify-end gap-2">
        <ButtonLink to={`edit/${_id}`} warning>
          Edit
        </ButtonLink>
        <ButtonLink to={`${_id}`} primary>
          View
        </ButtonLink>
      </div>
    ),
    title: " ",
    sortable: false,
  },
];
