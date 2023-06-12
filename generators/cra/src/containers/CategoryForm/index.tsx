import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Api from "authenticator/api";
import { LeanCategoryDocument } from "categories-types/models/Category";
import { clsx } from "core-utils";
import { FilePicker, Input, MediaFormContext } from "forms";

import { omitUnchangedFormFields } from "helpers/omitUnchangedFormFields";

const fetchUploadToken = () =>
  Api.authSDK.getUploadToken({
    query: { mimeTypes: ["image/jpg", "image/jpeg", "image/png"] },
  });

type CategoryFormProps = {
  id: string;
  className?: string;
  onSubmit: SubmitHandler<LeanCategoryDocument>;
  defaultValues?: LeanCategoryDocument;
};

const CategoryForm = ({
  className,
  id,
  onSubmit,
  defaultValues,
}: CategoryFormProps) => {
  const [t] = useTranslation();

  const formMethods = useForm<LeanCategoryDocument>({
    defaultValues,
  });

  const {
    formState: { dirtyFields },
  } = formMethods;

  return (
    <MediaFormContext
      id={id}
      className={clsx(className)}
      onSubmit={omitUnchangedFormFields(dirtyFields, onSubmit)}
      fetchTokenFunction={fetchUploadToken}
      {...formMethods}
    >
      <FilePicker
        validate={[{ rule: "exists" }]}
        maxFiles={1}
        label="Image"
        name="image"
        accept={{ "image/png": [".jpeg", ".jpg", ".png"] }}
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="title"
        label={t("category.title")}
        placeholder={t("category.title")}
        type="text"
      />
      <Input
        name="artisticTitle"
        placeholder="Artistic Title"
        label="Artistic Title"
        type="text"
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="description"
        label={t("category.description")}
        placeholder={t("category.description")}
        type="text"
      />
    </MediaFormContext>
  );
};

export default CategoryForm;
