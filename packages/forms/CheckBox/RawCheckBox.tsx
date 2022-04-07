import { forwardRef } from "react";

import { clsx } from "core-utils";

export type RawCheckBoxProps = {
  label: string;
  disabled?: boolean;
  error?: string;
  name: string;
} & Omit<React.ComponentPropsWithRef<"input">, "type">;
const CheckBox = forwardRef<HTMLInputElement, RawCheckBoxProps>(
  ({ label, error, name, ...rest }, ref) => (
    <div className="mb-6 flex items-start">
      <div className="flex h-5 items-center">
        <input
          className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
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

export default CheckBox;
