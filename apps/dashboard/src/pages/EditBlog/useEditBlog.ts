import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Api from "api";
import { BlogInResponse } from "blogs-types/routes/blogs";
import { useFirstMount } from "core-hooks";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useEditBlog = () => {
  const isFirstMount = useFirstMount();
  const { slug } = useParams<{ slug: string }>();

  const navigation = useNavigate();
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<null | BlogInResponse>(null);

  if (isFirstMount && slug) {
    Api.blogsSDK
      .getBlogBySlug({ params: { slug } })
      .then(({ blog: blogData }) => setBlog(blogData));
  }

  const onSubmit: SubmitHandler<BlogInResponse> = async (data) => {
    if (!slug) return;
    try {
      setLoading(true);
      await Api.blogsSDK.updateBlogBySlug({ body: data, params: { slug } });
      toast.success(t("blog.blogUpdatedSuccess"));
      navigation("/blogs");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
    setLoading(false);
  };

  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  return {
    handleSubmit,
    submitModalProps,
    loading,
    t,
    blog,
  };
};
