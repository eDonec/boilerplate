import { Button, Loader } from "core-ui";
import { AlertDialog } from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import CategoryForm from "containers/CategoryForm";

import { useEditCategory } from "./useEditCategory";

const FORM_ID = "edit-category-form";

const EditCategory = () => {
  const { t, handleSubmit, loading, submitModalProps, category } =
    useEditCategory();

  useInitRoute(
    {
      description: t("category.updateTitle"),
      title: t("category.updateTitle"),
      customButton: (
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.CATEGORY}
        >
          <Button
            isLoading={loading || !category}
            success
            type="submit"
            form={FORM_ID}
          >
            {t("misc.save")}
          </Button>
        </AccessProtectedWrapper>
      ),
    },
    [loading, !category]
  );

  if (!category)
    return (
      <div className="grid w-full place-items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <CategoryForm
        defaultValues={category}
        onSubmit={handleSubmit}
        id={FORM_ID}
      />
      <AlertDialog
        size="small"
        title={t("category.updateTitle")}
        message={t("category.updateBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default EditCategory;
