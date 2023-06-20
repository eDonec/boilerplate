import * as React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";

import clsx from "core-utils/clsx";
import { useCombobox } from "downshift";

import { ISelectOption } from "../Select/types"; //TODO: Is this correct ?

export const getDataFilter = (inputValue: string | undefined) => {
  const lowerCasedInputValue = inputValue?.toLowerCase();

  const dataFilter = (element: { label: string; value: unknown }) =>
    !inputValue ||
    (lowerCasedInputValue &&
      element.label.toLowerCase().includes(lowerCasedInputValue));

  return dataFilter;
};

export interface RawAutocompleteProps<T = string> {
  data: ISelectOption<T>[];
  label?: string;
  placeholder?: string;
  toggle?: boolean;
  value?: ISelectOption<T>;
  onChange?: (value: ISelectOption<T> | null) => void;
  initialValue?: this["data"][number];
  className?: string;
  optionClassName?: string;
}
const RawAutocomplete = <T = string,>({
  data,
  label,
  placeholder,
  toggle,
  onChange,
  initialValue,
  className,
  optionClassName,
  value,
}: RawAutocompleteProps<T>) => {
  const [items, setItems] = useState(data);
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getItemProps,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      setItems(data.filter(getDataFilter(inputValue)));
    },
    items,
    itemToString(item) {
      return item ? item.label : "";
    },
    onSelectedItemChange: onChange
      ? ({ selectedItem: newSelectedItem }) => {
          onChange(newSelectedItem || null);
          setIsFocused(false);
        }
      : undefined,
  });
  const ref = React.useRef<HTMLBodyElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  //TODO: verify this
  React.useEffect(() => {
    if (initialValue && initialValue?.value !== value?.value)
      onChange?.(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    // @ts-expect-error error it React Typing ref https://www.youtube.com/watch?v=M3TPmOpNFCs&ab_channel=MattPocock
    if (typeof document !== "undefined") ref.current = document.body;
    const onBlur = () => {
      setIsFocused(false);
    };
    const onFocus = () => {
      setIsFocused(true);
    };

    inputRef.current?.addEventListener("blur", onBlur);
    inputRef.current?.addEventListener("focus", onFocus);

    return () => {
      inputRef.current?.removeEventListener("blur", onBlur);
      inputRef.current?.removeEventListener("focus", onFocus);
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;
    if (isOpen || isFocused) ref.current.style.overflow = "hidden";
    else ref.current.style.overflow = "unset";
  }, [isOpen, isFocused]);

  return (
    <div>
      <div className={`${className} flex w-auto flex-col gap-1 `}>
        {label && (
          <label className="w-fit" {...getLabelProps()}>
            {label}
          </label>
        )}
        <div className="flex gap-0.5 shadow-sm">
          {placeholder && (
            <div ref={inputRef} className="w-full">
              <input
                placeholder={placeholder}
                className="mx-0  block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:focus:border-primary-300 dark:focus:ring-primary-300"
                {...getInputProps()}
              />
            </div>
          )}
          {toggle && (
            <button
              aria-label="toggle menu"
              className="px-2"
              type="button"
              {...getToggleButtonProps()}
            >
              {isOpen ? <>&#8593;</> : <>&#8595;</>}
            </button>
          )}
        </div>
      </div>
      {ref.current &&
        createPortal(
          <ul
            className={`${optionClassName} fixed max-h-80 bg-white p-0`}
            style={{
              top: inputRef.current?.getBoundingClientRect().bottom,
              left: inputRef.current?.getBoundingClientRect().left,
              zIndex: 9999999,
              width: inputRef.current?.getBoundingClientRect().width,
              maxHeight: isOpen ? "200px" : "auto",
              overflowY: "scroll",
            }}
            {...getMenuProps()}
          >
            {(isOpen || isFocused) &&
              items.map((item, index) => (
                <li
                  className={clsx(
                    "hover:bg-blue-300",
                    value?.label === item.label && "font-bold",
                    "flex flex-col px-3 py-2 shadow-sm"
                  )}
                  key={`${item}${index}`}
                  {...getItemProps({ item, index })}
                >
                  <span>{item.label}</span>
                </li>
              ))}
          </ul>,
          ref.current
        )}
    </div>
  );
};

export default RawAutocomplete;
