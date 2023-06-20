import * as React from "react";

import { clsx } from "core-utils";

import Link, { LinkProps } from "next/link";

export type UnstyledLinkProps = {
  href: LinkProps["href"];
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
  disabled?: boolean;
} & Omit<React.ComponentPropsWithRef<"a">, "href"> &
  LinkProps;

const UnstyledLink = React.forwardRef<HTMLAnchorElement, UnstyledLinkProps>(
  (
    {
      children,
      href,
      openNewTab,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      disabled,
      ...rest
    },
    ref
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href &&
          typeof href === "string" &&
          !href.startsWith("/") &&
          !href.startsWith("#");

    if (!isNewTab) {
      return (
        <Link
          className={clsx(
            rest.className,
            disabled && "pointer-events-none cursor-not-allowed"
          )}
          {...{
            href,
            as,
            replace,
            scroll,
            shallow,
            passHref,
            prefetch,
            locale,
          }}
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
        href={href as string}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
