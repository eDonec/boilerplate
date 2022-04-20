import { forwardRef } from "react";

import { clsx } from "core-utils";

export type IRadioButton = {
  value: string;
  label: string;
};
export type RawRadioButtonProps = {
  values: IRadioButton[];
  error?: string;
  name: string;
} & Omit<React.ComponentPropsWithRef<"input">, "type">;
const RawRadioButton = forwardRef<HTMLInputElement, RawRadioButtonProps>(
  ({ error, name, className, values, ...rest }, ref) => (
    <div className="mb-6 flex items-start">
      <div>
        <div>
          {values.map((o, i) => (
            <div key={o.value}>
              <div className="mr-2 mb-2 flex items-center">
                <input
                  defaultChecked={i === 0}
                  className={clsx("form-radio h-4 w-4", className)}
                  name={name}
                  type="radio"
                  value={o.value}
                  id={o.label}
                  ref={ref}
                  {...rest}
                />
                <label
                  className={clsx(
                    "text-m ml-3",
                    "cursor-pointer",
                    "font-medium text-gray-900 dark:text-gray-300",
                    "hover:text-gray-600 dark:hover:text-gray-400",
                    className
                  )}
                  htmlFor={o.label}
                >
                  {o.label}
                </label>
              </div>
            </div>
          ))}
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
        )}
      </div>
    </div>
  )
);

export default RawRadioButton;
