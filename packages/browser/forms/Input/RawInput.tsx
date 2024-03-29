import React, { forwardRef, HTMLInputTypeAttribute, useState } from "react";

import clsx from "core-utils/clsx";

import EyeSlashSvg from "./Icons/EyeSlashSvg";
import EyeSvg from "./Icons/EyeSvg";

export type RawInputProps = {
  label?: string;
  labelClassName?: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute | "textarea";
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  name: string;
  innerWrapperClassName?: string;
  outerWrapperClassName?: string;
} & React.ComponentPropsWithRef<"input"> &
  React.ComponentPropsWithRef<"textarea">;

const Input = forwardRef<HTMLInputElement, RawInputProps>(
  (
    {
      label,
      labelClassName,
      error,
      name,
      leftIcon,
      rightIcon,
      type = "text",
      className,
      required,
      innerWrapperClassName,
      outerWrapperClassName,
      ...rest
    },
    ref
  ) => {
    const isPassword = type === "password";
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const handletoggleShowPassword = (): void => {
      setIsPasswordShown((prev) => !prev);
    };

    const fieldType = isPasswordShown ? "text" : type;

    return (
      <div className={clsx(outerWrapperClassName)}>
        <div className="">
          {label && (
            <label
              htmlFor={name}
              className={clsx(
                "block text-sm font-medium text-gray-900 dark:text-gray-300",
                error && "text-red-600 dark:text-red-500",
                labelClassName
              )}
            >
              {label}
              {required && <span className="text-red-600">*</span>}
            </label>
          )}
          <div className={clsx("flex", innerWrapperClassName)}>
            {leftIcon && (
              <span
                className={clsx(
                  "inline-flex items-center rounded-l-md border border-r-0",
                  "border-gray-300 bg-gray-200 text-gray-900",
                  "px-3 text-sm",
                  "dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
                  error && "border-red-500 bg-red-100 text-red-900",
                  error &&
                    "dark:border-red-400 dark:bg-red-200 dark:text-red-900"
                )}
              >
                {leftIcon}
              </span>
            )}
            <InputOrTextArea
              ref={ref}
              id={name}
              name={name}
              type={fieldType}
              className={clsx(
                "block w-full rounded border",
                leftIcon && "rounded-l-none border-l-0",
                rightIcon && "rounded-r-none border-r-0",

                className,
                "border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700",
                "p-2.5 text-sm",
                "dark:placeholder-gray-400",
                "focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-300 dark:focus:ring-primary-300",
                error &&
                  "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500  ",
                error &&
                  "dark:border-red-400 dark:bg-red-100 dark:text-red-900 dark:placeholder-red-700 dark:focus:border-red-500 dark:focus:ring-red-500"
              )}
              {...rest}
            />
            {(isPassword || rightIcon) && (
              <span
                className={clsx(
                  "inline-flex items-center rounded-r-md border border-l-0",
                  "border-gray-300 bg-gray-200 text-gray-900",
                  "px-3 text-sm",
                  "dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
                  error && "border-red-500 bg-red-100 text-red-900",
                  error &&
                    "dark:border-red-400 dark:bg-red-200 dark:text-red-900",
                  isPassword && "cursor-pointer"
                )}
                onClick={isPassword ? handletoggleShowPassword : undefined}
              >
                {/* eslint-disable-next-line no-nested-ternary */}
                {isPassword ? (
                  isPasswordShown ? (
                    <EyeSlashSvg />
                  ) : (
                    <EyeSvg />
                  )
                ) : (
                  rightIcon
                )}
              </span>
            )}
          </div>
          {/* error message */}
          {error && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default Input;

const InputOrTextArea = forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithRef<"input"> & React.ComponentPropsWithRef<"textarea">
>(({ type, ...rest }, ref) => {
  if (type === "textarea") {
    return (
      <textarea ref={ref as React.LegacyRef<HTMLTextAreaElement>} {...rest} />
    );
  }

  return <input ref={ref} type={type} {...rest} />;
});
