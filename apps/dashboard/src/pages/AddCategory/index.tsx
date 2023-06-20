import { Button } from "core-ui";
import { AlertDialog } from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import CategoryForm from "containers/CategoryForm";

import { useAddCategory } from "./useAddCategory";

const FORM_ID = "add-category-form";

const AddCategory = () => {
  const { t, handleSubmit, loading, submitModalProps } = useAddCategory();

  useInitRoute(
    {
      description: t("category.creationTitle"),
      title: t("category.creationTitle"),
      customButton: (
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.ROLE}
        >
          <Button isLoading={loading} success type="submit" form={FORM_ID}>
            {t("misc.submit")}
          </Button>
        </AccessProtectedWrapper>
      ),
    },
    [loading]
  );

  return (
    <>
      <CategoryForm onSubmit={handleSubmit} id={FORM_ID} />
      <AlertDialog
        size="small"
        title={t("category.creationTitle")}
        message={t("category.creationBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default AddCategory;
