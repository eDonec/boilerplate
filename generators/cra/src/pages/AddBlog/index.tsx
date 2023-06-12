import { Button } from "core-ui";
import { AlertDialog } from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import BlogForm from "containers/BlogForm";

import { useAddBlog } from "./useAddBlog";

const FORM_ID = "add-blog-form";

const AddBlog = () => {
  const { t, handleSubmit, loading, submitModalProps } = useAddBlog();

  useInitRoute(
    {
      description: t("blog.creationTitle"),
      title: t("blog.creationTitle"),
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
      <BlogForm onSubmit={handleSubmit} id={FORM_ID} />
      <AlertDialog
        size="small"
        title={t("blog.creationTitle")}
        message={t("blog.creationBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default AddBlog;
