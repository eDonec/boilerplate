import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Api from "api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useAddCategory = () => {
  const navigation = useNavigate();
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LeanCategoryDocument> = async (data) => {
    try {
      setLoading(true);
      await Api.categoriesSDK.addCategory({ body: data });
      toast.success(t("category.categoryCreatedSuccess"));
      navigation("/categories");
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
