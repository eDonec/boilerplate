import { forwardRef, LegacyRef } from "react";

import { clsx } from "core-utils";

import OptionHeader from "./OptionHeader";
import SelectOptions from "./SelectOptions";
import { ISelectOption } from "./types";
import { useSelect } from "./useSelectInput";

export interface RawSelectProps<T = string> {
  options: ISelectOption<T>[];
  onChange: (value: ISelectOption<T>) => void;
  initialValue?: ISelectOption<T>;
  label?: string;
  unsetLabel?: string;
  error?: string;
  value?: ISelectOption<T>;
}

const Select = forwardRef<LegacyRef<HTMLDivElement>, RawSelectProps>(
  ({ options, onChange, initialValue, label, value, error }, ref) => {
    const { handleSelectionChange, isOpen, toggleOpenSelectOptions } =
      useSelect({
        onChange,
        initialValue,
        value,
      });

    return (
      <div
        ref={ref as LegacyRef<HTMLDivElement>}
        className={clsx(
          "border-gray-400 text-gray-600",
          error &&
            "border-red-600 text-red-900 dark:border-red-500 dark:text-red-900"
        )}
      >
        <p>{label}</p>

        <OptionHeader
          isOpen={isOpen}
          unsetLabel="Language"
          value={value}
          toggleOpenSelectOptions={toggleOpenSelectOptions}
          error={error}
        />

        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
        {isOpen && (
          <div
            className={clsx([
              "fixed",
              "top-0 left-0 -z-0",
              "min-h-screen min-w-[100vw]",
              "bg-transparent",
              error && "text-red-900 dark:text-red-900",
            ])}
            onClick={toggleOpenSelectOptions}
          />
        )}
        {isOpen && (
          <SelectOptions onChange={handleSelectionChange} options={options} />
        )}
      </div>
    );
  }
);

export default Select;
