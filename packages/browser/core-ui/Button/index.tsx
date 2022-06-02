import { forwardRef } from "react";

import clsx from "core-utils/clsx";
import { RequireOnlyOne } from "shared-types";

import { getVariantsClsx } from "../helpers/getVariantsClsx";

export enum ButtonVariant {
  "primary" = "primary",
  "ghost" = "ghost",
  "gray" = "gray",
  "light" = "light",
  "success" = "success",
  "warning" = "warning",
  "danger" = "danger",
  "info" = "info",
}
type ButtonVariantPropType = {
  [key in ButtonVariant]: boolean;
};
type TButtonVariant = RequireOnlyOne<
  ButtonVariantPropType,
  keyof ButtonVariantPropType
>;

export type ButtonProps = {
  isLoading?: boolean;
  soft?: boolean;
  outline?: boolean;
} & TButtonVariant &
  React.ComponentPropsWithRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      primary,
      outline,
      ghost,
      success,
      warning,
      danger,
      gray,
      soft,
      info,
      light,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={clsx(
          "inline-flex items-center rounded px-4 py-2 font-semibold",
          "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
          "text-sm shadow-sm",
          "bg",
          "transition-colors duration-75",
          "disabled:cursor-not-allowed",
          "dark:bg-gray-900 dark:text-white",
          "dark:border-gray-600",
          "dark:hover:bg-gray-800 dark:active:bg-gray-700 dark:disabled:bg-gray-700",
          isLoading && [
            "transition-none hover:text-gray-600 disabled:cursor-wait",
            {
              "text-white": primary || success || warning || danger,
              "text-black": light || gray || info,
              "text-primary-500": outline || ghost,
            },
          ],
          getVariantsClsx(
            {
              ghost,
              light,
              success,
              gray,
              warning,
              danger,
              info,
            },
            !!soft,
            !!outline
          ),
          className
        )}
        {...rest}
      >
        {isLoading ? "loading..." : children}
      </button>
    );
  }
);

export default Button;

export { getVariantsClsx };
