import { LeanCategoryDocument } from "categories-types/models/Category";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";
import { getImageUrl } from "core-utils";
import { TFunction } from "i18next";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

export const categoriesPageColumns = ({
  onDeleteCategory,
  currentlyDeletingCategory,
  t,
}: {
  onDeleteCategory: (id: string) => void;
  currentlyDeletingCategory: string | null;
  t: TFunction;
}): DataTableColumn<LeanCategoryDocument>[] => [
  {
    title: "Image",
    cell: (row) => (
      <img src={getImageUrl(row.image.url)} alt="banner" width="100" />
    ),
    sortable: false,
  },
  {
    title: t("category.title"),
    selector: "title",
  },
  {
    title: "Artistic title",
    selector: "artisticTitle",
  },
  {
    cell: ({ _id }) => (
      <div className="flex justify-end gap-2">
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.CATEGORY}
        >
          <ButtonLink
            disabled={currentlyDeletingCategory === _id}
            to={`edit/${_id}`}
            warning
          >
            {t("misc.edit")}
          </ButtonLink>
        </AccessProtectedWrapper>
        <AccessProtectedWrapper
          privileges={PRIVILEGE.DELETE}
          ressource={ACCESS_RESSOURCES.CATEGORY}
        >
          <Button
            isLoading={currentlyDeletingCategory === _id}
            danger
            onClick={() => onDeleteCategory(_id)}
          >
            {t("misc.delete")}
          </Button>
        </AccessProtectedWrapper>
      </div>
    ),
    title: " ",
    sortable: false,
  },
];
