import { Button, Loader } from "core-ui";
import { AlertDialog } from "core-ui/AlertDialog";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import BlogForm from "containers/BlogForm";

import { useEditBlog } from "./useEditBlog";

const FORM_ID = "edit-blog-form";

const EditBlog = () => {
  const { t, handleSubmit, loading, submitModalProps, blog } = useEditBlog();

  useInitRoute(
    {
      description: t("blog.updateTitle"),
      title: t("blog.updateTitle"),
      customButton: (
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.BLOGS}
        >
          <Button
            isLoading={loading || !blog}
            success
            type="submit"
            form={FORM_ID}
          >
            {t("misc.save")}
          </Button>
        </AccessProtectedWrapper>
      ),
    },
    [loading, !blog]
  );

  if (!blog)
    return (
      <div className="grid w-full place-items-center">
        <Loader />
      </div>
    );

  return (
    <>
      <BlogForm defaultValues={blog} onSubmit={handleSubmit} id={FORM_ID} />
      <AlertDialog
        size="small"
        title={t("blog.updateTitle")}
        message={t("blog.updateBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default EditBlog;
