import { FieldError, useFormContext, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawCheckBox, { RawCheckBoxProps } from "./RawCheckBox";
import { validateForm } from "../helpers/validateForm";

export interface CheckBoxProps extends RawCheckBoxProps {
  validate?: TRule[];
}

const CheckBox: React.FC<CheckBoxProps> = ({ validate, ...props }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawCheckBox
      {...register(props.name, {
        validate: validateForm(props.name, validate || []),
      })}
      {...props}
      error={error?.message}
    />
  );
};

export default CheckBox;
