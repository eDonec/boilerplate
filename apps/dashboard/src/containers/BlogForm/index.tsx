import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Api from "api";
import { BlogInResponse } from "blogs-types/routes/blogs";
import MediaFormContext from "contexts/MediaFormContext";
import { clsx } from "core-utils";
import { FilePicker, Input, MultiSelect, WYSIWYGEditor } from "forms";
import Select, { ISelectOption } from "forms/Select";
import { TextDirection } from "shared-types";

import { omitUnchangedFormFields } from "helpers/omitUnchangedFormFields";

const fetchUploadToken = () =>
  Api.authSDK.getUploadToken({
    query: { mimeTypes: ["image/jpg", "image/jpeg", "image/png"] },
  });

type BlogFormProps = {
  id: string;
  className?: string;
  onSubmit: SubmitHandler<BlogInResponse>;
  defaultValues?: BlogInResponse;
};

const BlogForm = ({
  className,
  id,
  onSubmit,
  defaultValues,
}: BlogFormProps) => {
  const [t] = useTranslation();

  const [categories, setCategories] = useState<ISelectOption[]>([]);

  useEffect(() => {
    Api.categoriesSDK
      .getUnpaginatedCategories({})
      .then((response) =>
        setCategories(
          response.map((el) => ({ label: el.title, value: el._id }))
        )
      );
  }, []);

  const formMethods = useForm<
    Omit<
      BlogInResponse,
      "secondaryCategories" | "mainCategory" | "textDirection"
    > & {
      secondaryCategories: ISelectOption[];
      mainCategory: ISelectOption;
      textDirection: ISelectOption<TextDirection>;
    }
  >({
    defaultValues: {
      ...defaultValues,
      secondaryCategories: defaultValues?.secondaryCategories.map((el) => ({
        label:
          categories.find((category) => category.value === el)?.label || el,
        value: el,
      })),
      mainCategory: categories.find(
        (el) => el.value === defaultValues?.mainCategory
      ),
      textDirection: {
        label: defaultValues?.textDirection || TextDirection.LTR,
        value: defaultValues?.textDirection || TextDirection.LTR,
      },
    },
  });

  useEffect(() => {
    if (!defaultValues || !categories.length) return;

    formMethods.reset({
      ...defaultValues,
      secondaryCategories: defaultValues?.secondaryCategories.map((el) => ({
        label:
          categories.find((category) => category.value === el)?.label || el,
        value: el,
      })),
      mainCategory: categories.find(
        (el) => el.value === defaultValues?.mainCategory
      ),
      textDirection: {
        label: defaultValues?.textDirection || TextDirection.LTR,
        value: defaultValues?.textDirection || TextDirection.LTR,
      },
    });
  }, [categories, defaultValues]);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const _onSubmit: SubmitHandler<
    Omit<
      BlogInResponse,
      "secondaryCategories" | "mainCategory" | "textDirection"
    > & {
      secondaryCategories?: ISelectOption[];
      mainCategory?: ISelectOption;
      textDirection?: ISelectOption<TextDirection>;
    }
  > = (value) => {
    onSubmit({
      ...value,
      secondaryCategories:
        value.secondaryCategories?.map((el) => el.value) ||
        defaultValues?.secondaryCategories ||
        [],
      mainCategory:
        value.mainCategory?.value || defaultValues?.mainCategory || "",
      textDirection:
        value.textDirection?.value ||
        defaultValues?.textDirection ||
        TextDirection.LTR,
    });
  };

  const {
    formState: { dirtyFields },
  } = formMethods;

  // TODO : fix the z-index issue
  return (
    <MediaFormContext
      {...formMethods}
      id={id}
      fetchTokenFunction={fetchUploadToken}
      onSubmit={omitUnchangedFormFields(dirtyFields, _onSubmit)}
      className={clsx("grid gap-4", className)}
    >
      <div className="z-20">
        <Select
          className="w-full"
          name="mainCategory"
          options={categories}
          label="Catégorie principale"
          placeholder="Catégorie prinicpale"
        />
      </div>
      <div className="z-10">
        <MultiSelect
          className="w-full"
          name="secondaryCategories"
          options={categories.filter(
            (el) => el.value !== formMethods.watch("mainCategory")?.value
          )}
          label="Catégories secondaires"
          placeholder="Catégories secondaires"
        />
      </div>
      <FilePicker
        validate={[{ rule: "exists" }]}
        maxFiles={1}
        label="Banner"
        name="banner"
        accept={{ "image/png": [".jpeg", ".jpg", ".png"] }}
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="title"
        label={t("blog.title")}
        placeholder={t("blog.title")}
        type="text"
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="description"
        label={t("blog.description")}
        placeholder={t("blog.description")}
        type="textarea"
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="metaDescription"
        label={t("meta.description")}
        placeholder={t("meta.description")}
        type="textarea"
      />
      <div className="z-10">
        <Select
          className="w-full"
          placeholder="Text direction"
          label="Text direction"
          name="textDirection"
          options={Object.values(TextDirection).map((el) => ({
            label: el,
            value: el,
          }))}
        />
      </div>
      <WYSIWYGEditor
        label={t("blog.content")}
        validate={[{ rule: "isEmpty" }]}
        name="content"
      />
    </MediaFormContext>
  );
};

export default BlogForm;
