import React from "react";
import { FieldError, useFormContext, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawRadioButton, { RawRadioButtonProps } from "./RawRadioButton";
import { validateForm } from "../helpers/validateForm";

export interface RadioButtonProps extends Omit<RawRadioButtonProps, "error"> {
  validate?: TRule[];
}

const RadioButton: React.FC<RadioButtonProps> = ({ validate, ...props }) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawRadioButton
      {...register(props.name, {
        validate: validateForm(props.name, validate || []),
      })}
      {...props}
      error={error?.message}
    />
  );
};

export default RadioButton;
