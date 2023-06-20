import { UncontrolledDataTable } from "core-cra-components";
import ButtonLink from "core-cra-components/ButtonLink";
import AlertDialog from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { useBlogsPage } from "./useBlogsPage";

const Blogs = () => {
  const { fetchFunction, columns, t, deleteModalProps, dataTableRef } =
    useBlogsPage();

  useInitRoute({
    description: "Blog management",
    title: "Blogs",
    customButton: (
      <AccessProtectedWrapper
        privileges={PRIVILEGE.WRITE}
        ressource={ACCESS_RESSOURCES.BLOGS}
      >
        <ButtonLink to="blogs/add" soft primary>
          {t("blog.addNewBlog")}
        </ButtonLink>
      </AccessProtectedWrapper>
    ),
  });

  return (
    <>
      <UncontrolledDataTable
        showSearch
        fetchFunction={fetchFunction}
        columns={columns}
        keyExtractor={({ item }) => item._id}
        handle={dataTableRef}
      />
      <AlertDialog
        size="small"
        title={t("blog.deleteTitle")}
        message={t("blog.deleteBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...deleteModalProps}
      />
    </>
  );
};

export default Blogs;
