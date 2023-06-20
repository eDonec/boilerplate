import {
  Controller,
  FieldError,
  useFormContext,
  useFormState,
} from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawMultiSelect, { RawMultiSelectProps } from "./RawMultiSelect";
import { validateForm } from "../helpers/validateForm";

export interface MultiSelectProps
  extends Omit<RawMultiSelectProps, "onChange" | "value" | "error"> {
  validate?: TRule[];
  displayName?: string;
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  validate,
  className,
  displayName,
  ...props
}) => {
  const { control, getValues } = useFormContext();

  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <Controller
      rules={{
        validate: validateForm(props.name, validate || [], displayName),
      }}
      control={control}
      name={props.name}
      defaultValue={props.initialValue || getValues(props.name)}
      render={({ field: { onChange, value, ref } }) => (
        <RawMultiSelect
          onChange={onChange}
          className={`w-100 mb-6 ${className}`}
          {...props}
          ref={ref}
          initialValue={getValues(props.name)}
          value={value}
          error={error?.message}
        />
      )}
    />
  );
};

export default MultiSelect;
