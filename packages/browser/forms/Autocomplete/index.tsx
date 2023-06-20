import { Controller, useFormContext } from "react-hook-form";

import { TRule } from "field-validator/types";

import RawAutocomplete, { RawAutocompleteProps } from "./RawAutocomplete";
import { validateForm } from "../helpers/validateForm";

export type AutocompleteProps<T> = RawAutocompleteProps<T> & {
  validate?: TRule[];
  name: string;
  className?: string;
  displayName?: string;
};

const Autocomplete = <T = string,>({
  validate,
  className,
  displayName,
  ...props
}: AutocompleteProps<T>) => {
  const { control, getValues } = useFormContext();

  return (
    <Controller
      rules={{
        validate: validateForm(props.name, validate || [], displayName),
      }}
      control={control}
      name={props.name}
      // defaultValue={props.initialValue || getValues(props.name)}
      render={({ field: { onChange, value } }) => (
        <RawAutocomplete
          onChange={onChange}
          className={`w-100 mb-6 ${className}`}
          {...props}
          // ref={ref}
          initialValue={getValues(props.name)}
          value={value}
        />
      )}
    />
  );
};

export default Autocomplete;
