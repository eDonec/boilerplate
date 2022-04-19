import { forwardRef, LegacyRef } from "react";

import { clsx } from "core-utils";

import OptionHeader from "./OptionHeader";
import SelectOptions from "./SelectOptions";
import { ISelectOption } from "./types";
import { useSelectInput } from "./useSelectInput";

export interface RawSelectProps<T = string> {
  options: ISelectOption<T>[];
  onChange: (value: ISelectOption<T>) => void;
  initialValue?: ISelectOption<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  value: ISelectOption<T> | undefined;
  className?: string;
}

const Select = forwardRef<LegacyRef<HTMLDivElement>, RawSelectProps>(
  (
    {
      options,
      onChange,
      initialValue,
      label,
      value,
      error,
      className,
      placeholder,
    },
    ref
  ) => {
    const { handleSelectionChange, isOpen, toggleOpenSelectOptions } =
      useSelectInput({
        onChange,
        initialValue,
        value,
      });

    return (
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        className={clsx(
          className,
          "border-gray-400 text-gray-600",
          error &&
            "border-red-600 text-red-900 dark:border-red-500 dark:text-red-900"
        )}
      >
        <div className="mb-6">
          {label && (
            <label
              className={clsx(
                "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300",
                error && "text-red-600 dark:text-red-500"
              )}
            >
              {label}
            </label>
          )}

          <OptionHeader
            isOpen={isOpen}
            placeholder={placeholder}
            value={value}
            toggleOpenSelectOptions={toggleOpenSelectOptions}
            error={error}
          />

          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
          {isOpen && (
            <div
              className={clsx([
                "fixed",
                "top-0 left-0 -z-0",
                "min-h-screen min-w-[100vw]",
                "bg-transparent",
              ])}
              onClick={toggleOpenSelectOptions}
            />
          )}
          {isOpen && (
            <SelectOptions onChange={handleSelectionChange} options={options} />
          )}
        </div>
      </div>
    );
  }
);

export default Select;
export * from "./types";
