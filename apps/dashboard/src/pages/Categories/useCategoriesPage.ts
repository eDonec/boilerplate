import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Api from "api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

import { UncontrolledDataTableHandle } from "data-table/InternalUncontrolledDataTable/types";

import { categoriesPageColumns } from "./categoriesPageColumns";

const fetchFunction: FetchFunction<LeanCategoryDocument> = (args) =>
  Api.categoriesSDK.getCategories({ query: args });

export const useCategoriesPage = () => {
  const [t] = useTranslation();

  const [currentlyDeletingCategory, setCurrentlyDeletingCategory] = useState<
    null | string
  >(null);
  const dataTableRef =
    useRef<UncontrolledDataTableHandle<LeanCategoryDocument>>(null);

  const deleteCategory = async (id: string) => {
    try {
      setCurrentlyDeletingCategory(id);
      await Api.categoriesSDK.deleteCategory({ params: { id } });
      toast.success(t("category.categoryDeletedSuccess"));
      await dataTableRef.current?.refresh();
    } catch (error) {
      if (
        isApiError<{ message: string }>(error) &&
        error.response?.data.message
      )
        toast.error(error.response.data.message);
    } finally {
      setCurrentlyDeletingCategory(null);
    }
  };
  const [deleteModalProps, handleDelete] = useAlertDialog(deleteCategory);

  return {
    fetchFunction,
    columns: categoriesPageColumns({
      t,
      currentlyDeletingCategory,
      onDeleteCategory: handleDelete,
    }),
    t,
    deleteModalProps,
    dataTableRef,
  };
};
