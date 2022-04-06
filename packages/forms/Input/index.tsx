import { forwardRef } from "react";

export type InputProps = {
  label?: string;
  placeholder: string;
  type: HTMLInputElement["type"];
} & React.ComponentPropsWithRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, ...rest }, ref) => (
    <div>
      <div className="mb-6">
        {label && (
          <label
            htmlFor={name}
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          className="block w-full rounded border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...rest}
        />
      </div>
    </div>
  )
);

export default Input;
