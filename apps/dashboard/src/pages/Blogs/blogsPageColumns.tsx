import { BlogInPaginatedResponse } from "blogs-types/routes/blogs";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";
import { getImageUrl } from "core-utils";
import { TFunction } from "i18next";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { DataTableColumn } from "data-table/BaseDataTable/types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

export const blogsPageColumns = ({
  onDeleteBlog,
  currentlyDeletingBlog,
  t,
}: {
  onDeleteBlog: (id: string) => void;
  currentlyDeletingBlog: string | null;
  t: TFunction;
}): DataTableColumn<BlogInPaginatedResponse>[] => [
  {
    title: "Banner",
    cell: (row) => (
      <img src={getImageUrl(row.banner.url)} alt="banner" width="100" />
    ),
    sortable: false,
  },
  {
    title: t("blog.title"),
    selector: "title",
  },
  {
    title: "Upvotes",
    selector: "upvotes",
  },
  {
    title: "Downvotes",
    selector: "downvotes",
  },
  {
    title: "Claps",
    selector: "claps",
  },
  {
    cell: ({ slug }) => (
      <div className="flex justify-end gap-2">
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.BLOGS}
        >
          <ButtonLink
            disabled={currentlyDeletingBlog === slug}
            to={`edit/${slug}`}
            warning
          >
            {t("misc.edit")}
          </ButtonLink>
        </AccessProtectedWrapper>
        <AccessProtectedWrapper
          privileges={PRIVILEGE.DELETE}
          ressource={ACCESS_RESSOURCES.BLOGS}
        >
          <Button
            isLoading={currentlyDeletingBlog === slug}
            danger
            onClick={() => onDeleteBlog(slug)}
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
