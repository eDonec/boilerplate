import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Api from "api";
import { BlogInResponse } from "blogs-types/routes/blogs";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useAddBlog = () => {
  const navigation = useNavigate();
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<BlogInResponse> = async (data) => {
    try {
      setLoading(true);
      await Api.blogsSDK.addBlog({ body: data });
      toast.success(t("blog.blogCreatedSuccess"));
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
  };
};
