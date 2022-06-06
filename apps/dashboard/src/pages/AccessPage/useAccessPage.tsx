import { useNavigate } from "react-router-dom";

import { LeanRoleDocument } from "auth-types/models/Role";
import Button from "core-ui/Button";

import { DataTableColumn } from "data-table/BaseDataTable/types";

export const useAccessPage = () => {
  const navigate = useNavigate();

  const onActionNavigation = (id: string) => {
    navigate(`/roles/${id}`);
  };

  const dataColumns: DataTableColumn<LeanRoleDocument>[] = [
    {
      selector: "name",
      title: "Role",
    },
    {
      cell: ({ _id }) => (
        <div className="flex justify-end gap-2">
          <Button primary onClick={() => onActionNavigation(_id)}>
            Edit
          </Button>
          <Button warning onClick={() => onActionNavigation(_id)}>
            View
          </Button>
        </div>
      ),
      title: " ",
      sortable: false,
    },
  ];

  return { dataColumns };
};
