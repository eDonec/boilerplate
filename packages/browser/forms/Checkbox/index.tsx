import { FieldError, useFormContext, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawCheckbox, { RawCheckboxProps } from "./RawCheckbox";
import { validateForm } from "../helpers/validateForm";

export interface CheckboxProps extends RawCheckboxProps {
  validate?: TRule[];
  displayName?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  validate,
  displayName,
  ...props
}) => {
  const { register } = useFormContext();
  const { errors } = useFormState();
  const error = get(errors, props.name) as FieldError | undefined;

  return (
    <RawCheckbox
      {...register(props.name, {
        validate: validateForm(props.name, validate || [], displayName),
      })}
      {...props}
      error={error?.message}
    />
  );
};

export default Checkbox;
