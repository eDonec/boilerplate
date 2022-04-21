import { FieldError, useFormContext, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawInput, { RawInputProps } from "./RawInput";
import { validateForm } from "../helpers/validateForm";

export interface InputProps extends RawInputProps {
  validate?: TRule[];
}

const Input: React.FC<InputProps> = ({ validate, ...props }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawInput
      {...register(props.name, {
        validate: validateForm(props.name, validate || []),
      })}
      {...props}
      error={error?.message}
    />
  );
};

export default Input;
