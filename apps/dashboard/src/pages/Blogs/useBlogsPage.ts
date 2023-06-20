import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import Api from "api";
import { BlogInPaginatedResponse } from "blogs-types/routes/blogs";
import { FetchFunction } from "core-cra-components/UncontrolledDataTable/types";
import { useAlertDialog } from "core-ui/AlertDialog";
import { isApiError } from "server-sdk";

import { UncontrolledDataTableHandle } from "data-table/InternalUncontrolledDataTable/types";

import { blogsPageColumns } from "./blogsPageColumns";

const fetchFunction: FetchFunction<BlogInPaginatedResponse> = (args) =>
  Api.blogsSDK.getBlogs({ query: args });

export const useBlogsPage = () => {
  const [t] = useTranslation();

  const [currentlyDeletingBlog, setCurrentlyDeletingBlog] = useState<
    null | string
  >(null);
  const dataTableRef =
    useRef<UncontrolledDataTableHandle<BlogInPaginatedResponse>>(null);

  const deleteBlog = async (slug: string) => {
    try {
      setCurrentlyDeletingBlog(slug);
      await Api.blogsSDK.deleteBlogBySlug({ params: { slug } });
      toast.success(t("blog.blogDeletedSuccess"));
      await dataTableRef.current?.refresh();
    } catch (error) {
      if (
        isApiError<{ message: string }>(error) &&
        error.response?.data.message
      )
        toast.error(error.response.data.message);
    } finally {
      setCurrentlyDeletingBlog(null);
    }
  };
  const [deleteModalProps, handleDelete] = useAlertDialog(deleteBlog);

  return {
    fetchFunction,
    columns: blogsPageColumns({
      t,
      currentlyDeletingBlog,
      onDeleteBlog: handleDelete,
    }),
    t,
    deleteModalProps,
    dataTableRef,
  };
};
