import * as React from 'react';

import Link, { LinkProps } from 'next/link';

export type UnstyledLinkProps = {
  href: string;
  children: React.ReactNode;
  openNewTab?: boolean;
  className?: string;
} & React.ComponentPropsWithRef<'a'> &
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
      ...rest
    },
    ref
  ) => {
    const isNewTab =
      openNewTab !== undefined
        ? openNewTab
        : href && !href.startsWith('/') && !href.startsWith('#');

    if (!isNewTab) {
      return (
        <Link
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
          <a ref={ref} {...rest}>
            {children}
          </a>
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        target='_blank'
        rel='noopener noreferrer'
        href={href}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

export default UnstyledLink;
