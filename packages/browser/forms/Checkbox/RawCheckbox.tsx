import { forwardRef } from "react";

import { clsx } from "core-utils";

export type RawCheckboxProps = {
  label: string;
  disabled?: boolean;
  error?: string;
  name: string;
} & Omit<React.ComponentPropsWithRef<"input">, "type">;
const Checkbox = forwardRef<HTMLInputElement, RawCheckboxProps>(
  ({ label, error, name, className, ...rest }, ref) => (
    <div className="mb-6 flex items-start">
      <div className="flex h-5 items-center">
        <input
          className={clsx(
            "focus:ring-3  focus:ring-primary-500",
            "h-4 w-4",
            " rounded border ",
            "border-gray-300",
            "dark:focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700",
            className
          )}
          type="checkbox"
          id={name}
          name={name}
          ref={ref}
          {...rest}
        ></input>
        {label && (
          <div className="ml-3 text-sm">
            <label
              htmlFor={name}
              className={clsx(
                "font-medium text-gray-900 dark:text-gray-300",
                "hover:text-gray-600 dark:hover:text-gray-400 ",
                "cursor-pointer",
                error && "text-red-600 dark:text-red-500"
              )}
            >
              {label}
            </label>
          </div>
        )}
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
);

export default Checkbox;
