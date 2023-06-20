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
} & Omit<TButtonVariant, ""> &
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
          "items-center rounded px-4 py-2 font-semibold",
          "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
          "text-sm shadow-sm",
          "transition-colors duration-75",
          "disabled:cursor-not-allowed",
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
              primary,
              ghost,
              light,
              success,
              warning,
              danger,
              gray,
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
