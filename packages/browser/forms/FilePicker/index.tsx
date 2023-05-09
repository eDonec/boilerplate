import { Controller, FieldError, get, useFormState } from "react-hook-form";

import { TRule } from "field-validator/types";

import RawFilePicker, { IComponentProps } from "./RawFilePicker";
import useMediaFormContext from "../contexts/RawMediaFormProvider/useMediaFormContext";
import { validateForm } from "../helpers/validateForm";

export interface IProps
  extends Omit<
    IComponentProps,
    "error" | "onChange" | "value" | "mediaUploadToken" | "fetchFunction"
  > {
  name: string;
  validate?: TRule[];
}

const FilePicker: React.FC<IProps> = ({
  name,
  validate,
  ...filePickerProps
}) => {
  const { control, mediaUploadToken, fetchFunction } = useMediaFormContext();
  const { errors } = useFormState();
  const error = get(errors, name) as FieldError | undefined;

  return (
    <Controller
      rules={{ validate: validateForm(name, validate || []) }}
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <RawFilePicker
          {...filePickerProps}
          mediaUploadToken={mediaUploadToken}
          fetchFunction={fetchFunction}
          name={name}
          ref={ref}
          value={value}
          onChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default FilePicker;
