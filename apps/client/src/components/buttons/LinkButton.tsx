import * as React from 'react';

import UnstyledLink, { UnstyledLinkProps } from 'components/links/UnstyledLink';

import clsx from 'helpers/clsx';

import { ButtonProps, getVariantsClsx } from './Button';

type ButtonLinkProps = ButtonProps & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      primary = true,
      outline,
      ghost,
      light,
      dark,
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={clsx(
          'inline-flex items-center rounded px-4 py-2 font-semibold',
          'focus:outline-none focus-visible:ring focus-visible:ring-primary-500',
          'shadow-sm',
          'transition-colors duration-75',
          getVariantsClsx({ primary, outline, ghost, light, dark }, isDarkBg),
          'disabled:cursor-not-allowed',
          className
        )}
      >
        {children}
      </UnstyledLink>
    );
  }
);

export default ButtonLink;
