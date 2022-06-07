import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export type UnstyledLinkProps = {
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  disabled?: boolean;
} & Omit<React.ComponentPropsWithRef<"a">, "href"> &
  LinkProps;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  ({ children, disabled, to, openNewTab, replace, ...rest }, ref) => {
    if (disabled)
      return (
        <span className="cursor-not-allowed" ref={ref} {...rest}>
          {children}
        </span>
      );

    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : to &&
          typeof to === "string" &&
          // TODO: Do something about microservices bouncing

          (to.startsWith("/") || to.startsWith("http"));

    if (!isNewTab) {
      return (
        <Link
          {...{
            replace,
            to,
            ...rest,
          }}
          ref={ref}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target="_blank"
        rel="noopener noreferrer"
        href={typeof to === "string" ? to : to.pathname}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
