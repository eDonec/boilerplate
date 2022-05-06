import { ButtonVariant } from "../Button";

//#region  //*=========== Variants ===========
export const getVariantsClsx = (
  {
    outline,
    ghost,
    light,
    success,
    gray,
    info,
    danger,
    warning,
  }: { [key in ButtonVariant]?: boolean },
  soft: boolean
) => {
  if (outline)
    return [
      soft
        ? `text-primary-300 border-primary-200`
        : `text-primary-500 border-primary-500`,
      `hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100`,
      `dark:text-primary-500 dark:bg-gray-200 dark:hover:bg-gray-900 dark:disabled:bg-gray-800 dark:active:bg-gray-800`,
    ];
  if (ghost)
    return [
      soft ? `text-primary-300  ` : `text-primary-500 `,
      `shadow-none`,
      `hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100`,
      `dark:hover:bg-gray-900 dark:disabled:bg-gray-800 dark:active:bg-gray-800 `,
    ];
  if (light)
    return [
      soft ? `text-gray-600` : `text-dark `,
      `hover:bg-gray-100 bg-white active:bg-white/80 disabled:bg-gray-200`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];
  if (success)
    return [
      soft
        ? `bg-success-100 text-success-700 hover:bg-success-200`
        : `bg-success-200 text-success-700 hover:bg-success-300`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];
  if (danger)
    return [
      soft
        ? `bg-danger-100 text-danger-600 hover:bg-danger-200`
        : `bg-danger-200 text-danger-700 hover:bg-danger-300`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];
  if (warning)
    return [
      soft
        ? `bg-warning-100 text-warning-600 hover:bg-warning-200`
        : `bg-warning-200 text-warning-700 hover:bg-warning-300`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];
  if (info)
    return [
      soft
        ? `bg-info-100 text-info-600 hover:bg-info-200`
        : `bg-info-200 text-info-700 hover:bg-info-300`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];
  if (gray)
    return [
      soft
        ? `bg-gray-100 text-gray-600 hover:bg-gray-200`
        : `bg-gray-200 text-gray-700 hover:bg-gray-300`,
      `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
    ];

  return [
    soft
      ? `bg-primary-100 text-primary-600 hover:bg-primary-200`
      : `bg-primary-200 text-primary-700 hover:bg-primary-300`,
    `dark:text-gray-500 dark:bg-gray-200 dark:hover:bg-gray-50 dark:disabled:bg-gray-800`,
  ];
};
