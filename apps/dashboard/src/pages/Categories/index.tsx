import ButtonLink from "core-cra-components/ButtonLink";
import UncontrolledDataTable from "core-cra-components/UncontrolledDataTable";
import AlertDialog from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

import { useCategoriesPage } from "./useCategoriesPage";

const Categories = () => {
  const { fetchFunction, columns, t, deleteModalProps, dataTableRef } =
    useCategoriesPage();

  useInitRoute({
    description: "Category management",
    title: "Categories",
    customButton: (
      <AccessProtectedWrapper
        privileges={PRIVILEGE.WRITE}
        ressource={ACCESS_RESSOURCES.CATEGORY}
      >
        <ButtonLink to="categories/add" soft primary>
          {t("category.addNewCategory")}
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
        title={t("category.deleteTitle")}
        message={t("category.deleteBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...deleteModalProps}
      />
    </>
  );
};

export default Categories;
