import {
  Controller,
  FieldError,
  useFormContext,
  useFormState,
} from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import { validateForm } from "../helpers/validateForm";
import RawSelect, { RawSelectProps } from "../Select/RawSelect";

export interface SelectProps
  extends Omit<RawSelectProps, "onChange" | "value" | "error"> {
  validate?: TRule[];
  name: string;
}

const Select: React.FC<SelectProps> = ({ validate, ...props }) => {
  const { control, getValues } = useFormContext();

  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <Controller
      rules={{ validate: validateForm(props.name, validate || []) }}
      control={control}
      name={props.name}
      defaultValue={props.initialValue || getValues(props.name)}
      render={({ field: { onChange, value, ref } }) => (
        <RawSelect
          onChange={onChange}
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

export default Select;
export * from "./types";
