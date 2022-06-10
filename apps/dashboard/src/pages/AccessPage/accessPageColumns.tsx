import { TFunction } from "react-i18next";

import { LeanRoleDocument } from "auth-types/models/Role";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

export const accessPageColumns = ({
  onDeleteRole,
  currentlyDeletingRole,
  t,
}: {
  onDeleteRole: (id: string) => void;
  currentlyDeletingRole: string | null;
  t: TFunction;
}): DataTableColumn<
  Omit<LeanRoleDocument, "access"> & { isDeletable: boolean }
>[] => [
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
          <ButtonLink
            disabled={currentlyDeletingRole === _id}
            to={`edit/${_id}`}
            warning
          >
            {t("misc.edit")}
          </ButtonLink>
        </AccessProtectedWrapper>
        <ButtonLink
          disabled={currentlyDeletingRole === _id}
          to={`${_id}`}
          primary
        >
          {t("misc.view")}
        </ButtonLink>
        {!isDefault && isDeletable && (
          <AccessProtectedWrapper
            privileges={PRIVILEGE.DELETE}
            ressource={ACCESS_RESSOURCES.ROLE}
          >
            <Button
              isLoading={currentlyDeletingRole === _id}
              danger
              onClick={() => onDeleteRole(_id)}
            >
              {t("misc.delete")}
            </Button>
          </AccessProtectedWrapper>
        )}
      </div>
    ),
    title: " ",
    sortable: false,
  },
];
