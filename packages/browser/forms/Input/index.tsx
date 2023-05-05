import { forwardRef } from "react";
import { FieldError, useFormContext, useFormState } from "react-hook-form";

import get from "core-utils/get";
import { TRule } from "field-validator/types";

import RawInput, { RawInputProps } from "./RawInput";
import { validateForm } from "../helpers/validateForm";

export interface InputProps extends RawInputProps {
  validate?: TRule[];
  displayName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ validate, displayName, ...props }, forwardedRef) => {
    const { register } = useFormContext();
    const { errors } = useFormState();
    const error = get(errors, props.name) as FieldError | undefined;

    const { ref: registerRef, ...registerRest } = register(props.name, {
      validate: validateForm(props.name, validate || [], displayName),
    });

    return (
      <RawInput
        {...registerRest}
        ref={(ref) => {
          registerRef(ref);
          if (forwardedRef) {
            if (typeof forwardedRef === "function") {
              forwardedRef(ref);
            } else {
              forwardedRef.current = ref;
            }
          }
        }}
        {...props}
        error={error?.message}
      />
    );
  }
);

export default Input;
