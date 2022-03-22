import { forwardRef } from 'react';

import clsx from 'core-utils/clsx';

export enum ButtonVariant {
  'primary' = 'primary',
  'outline' = 'outline',
  'ghost' = 'ghost',
  'light' = 'light',
  'dark' = 'dark',
}

export type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
} & {
  [key in ButtonVariant]?: boolean;
} & React.ComponentPropsWithRef<'button'>;

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
      light,
      dark,
      isDarkBg = false,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={clsx(
          'inline-flex items-center rounded px-4 py-2 font-semibold',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          'disabled:cursor-not-allowed',
          isLoading && [
            'transition-none hover:text-gray-600 disabled:cursor-wait',
            {
              'text-white': primary || dark,
              'text-black': light,
              'text-primary-500': outline || ghost,
            },
          ],

          getVariantsClsx({ primary, outline, ghost, light, dark }, isDarkBg),
          className
        )}
        {...rest}
      >
        {isLoading ? 'loading...' : children}
      </button>
    );
  }
);

export default Button;

//#region  //*=========== Variants ===========
export const getVariantsClsx = (
  { outline, ghost, light, dark }: { [key in ButtonVariant]?: boolean },
  isDarkBg: boolean
) => {
  if (outline)
    return [
      'text-primary-500',
      'border border-primary-500',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
      isDarkBg && 'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
    ];
  if (ghost)
    return [
      'text-primary-500',
      'shadow-none',
      'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
      isDarkBg && 'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
    ];
  if (light)
    return [
      'bg-white text-dark ',
      'border border-gray-300',
      'hover:bg-gray-100 hover:text-dark',
      'active:bg-white/80 disabled:bg-gray-200',
    ];
  if (dark)
    return [
      'bg-gray-900 text-white',
      'border border-gray-600',
      'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
    ];

  return [
    'bg-primary-500 text-white',
    'border border-primary-600',
    'hover:bg-primary-600 hover:text-white',
    'active:bg-primary-500',
    'disabled:bg-primary-400 disabled:hover:bg-primary-400',
  ];
};
//#endregion  //*======== Variants ===========
