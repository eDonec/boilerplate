import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import Api from "api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { useFirstMount } from "core-hooks";
import { useAlertDialog } from "core-ui/AlertDialog";

export const useEditCategory = () => {
  const isFirstMount = useFirstMount();
  const { id } = useParams<{ id: string }>();

  const navigation = useNavigate();
  const [t] = useTranslation();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<null | LeanCategoryDocument>(null);

  if (isFirstMount && id) {
    Api.categoriesSDK.getCategory({ params: { id } }).then(setCategory);
  }

  const onSubmit: SubmitHandler<LeanCategoryDocument> = async (
    data: LeanCategoryDocument
  ) => {
    if (!id) return;
    try {
      setLoading(true);
      await Api.categoriesSDK.updateCategory({ body: data, params: { id } });
      toast.success(t("category.categoryUpdatedSuccess"));
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
    category,
  };
};
