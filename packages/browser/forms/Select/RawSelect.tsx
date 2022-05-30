import { forwardRef } from "react";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import clsx from "core-utils/clsx";

import Shevron from "./Shevron";
import { ISelectOption } from "./types";
import { useSelectInput } from "./useSelectInput";

export interface RawSelectProps<T = string> {
  options: ISelectOption<T>[];
  onChange?: (value: ISelectOption<T>) => void;
  initialValue?: this["options"][number];
  label?: string;
  placeholder?: string;
  error?: string;
  value?: ISelectOption<T> | undefined;
  className?: string;
  itemClassName?: string;
  trigger?: JSX.Element;
  renderChildren?: (value: ISelectOption<T>) => JSX.Element;
}

const RawSelect = forwardRef<HTMLButtonElement, RawSelectProps>(
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
      trigger,
      renderChildren,
      itemClassName,
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
      <DropdownMenuPrimitive.Root onOpenChange={toggleOpenSelectOptions}>
        {label && (
          <DropdownMenuPrimitive.Label>{label}</DropdownMenuPrimitive.Label>
        )}
        <DropdownMenuPrimitive.Trigger ref={ref} asChild>
          {trigger || (
            <button
              className={clsx([
                className,
                "flex",
                "cursor-pointer",
                "items-center justify-between",
                "rounded border",
                !error &&
                  "dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200",
                error && "border-red-500 bg-red-50 text-red-600 ",
                error &&
                  "dark:border-red-400 dark:bg-red-100 dark:text-red-700 dark:focus:border-red-500 ",
              ])}
              onClick={() => toggleOpenSelectOptions(!isOpen)}
            >
              <p className="py-3 pl-3 text-sm leading-3 tracking-normal">
                {value?.label || initialValue?.label || placeholder}
              </p>

              <Shevron isUp={isOpen} error={error} />
            </button>
          )}
          {/* <Button primary>{label}</Button> */}
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={5}
          className={clsx(
            "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
            "min-w-[9rem] rounded-lg px-1.5 py-1 shadow-md",
            "bg-white dark:bg-gray-700"
          )}
        >
          {options.map((option) => (
            <DropdownMenuPrimitive.Item
              onSelect={() => handleSelectionChange(option)}
              key={option.value}
              className={clsx(
                itemClassName || [
                  "flex cursor-default select-none items-center rounded-md px-2 py-2 text-xs outline-none",
                  "focus:bg-primary-200 dark:focus:bg-primary-800  text-gray-400 dark:text-gray-500",
                  option.value === value?.value &&
                    "dark:bg-primary-900 bg-gray-300",
                ]
              )}
            >
              {renderChildren ? (
                renderChildren(option)
              ) : (
                <span className="flex-grow text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              )}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Root>
    );
  }
);

export default RawSelect;
