import * as React from "react";

import { ButtonProps, getVariantsClsx } from "core-ui/Button";
import clsx from "core-utils/clsx";

import UnstyledLink, { UnstyledLinkProps } from "../UnstyledLink";

type ButtonLinkProps = Omit<ButtonProps & UnstyledLinkProps, "isLoading">;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      primary = true,
      outline,
      ghost,
      light,
      success,
      warning,
      danger,
      gray,
      info,
      soft,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsx(
          "inline-flex items-center rounded px-4 py-2 font-semibold",
          "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          getVariantsClsx(
            {
              primary,
              outline,
              ghost,
              light,
              success,
              warning,
              danger,
              gray,
              info,
            },
            !!soft
          ),
          "disabled:cursor-not-allowed",
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
