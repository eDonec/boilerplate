import { Controller, FieldError, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawWYSIWYGEditor, { RawWYSIWYGEditorProps } from "./RawWYSIWYGEditor";
import useMediaFormContext from "../contexts/RawMediaFormProvider/useMediaFormContext";
import { validateForm } from "../helpers/validateForm";

export interface IProps
  extends Omit<
    RawWYSIWYGEditorProps,
    "error" | "onChange" | "value" | "mediaUploadToken" | "fetchFunction"
  > {
  name: string;
  validate?: TRule[];
  displayName?: string;
}

const WYSIWYGEditor: React.FC<IProps> = ({
  name,
  validate,
  displayName,
  ...WYSIWYGEditorProps
}) => {
  const { control, mediaUploadToken, fetchFunction } = useMediaFormContext();
  const { errors } = useFormState();
  const error = get(errors, name) as FieldError | undefined;

  return (
    <Controller
      rules={{ validate: validateForm(name, validate || [], displayName) }}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <RawWYSIWYGEditor
          {...WYSIWYGEditorProps}
          mediaUploadToken={mediaUploadToken}
          fetchFunction={fetchFunction}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default WYSIWYGEditor;
