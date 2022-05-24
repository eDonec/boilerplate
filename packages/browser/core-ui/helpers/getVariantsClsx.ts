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
      ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-900`,
      `hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100`,
      `dark:text-primary-500 dark:bg-gray-200 dark:hover:bg-gray-900 dark:disabled:bg-gray-800 dark:active:bg-gray-800`,
    ];

  if (light)
    return [
      soft ? `text-gray-600` : `text-dark `,
      ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
      `hover:bg-gray-100 bg-white active:bg-white/80 disabled:bg-gray-200`,
      `dark:text-gray-50 dark:bg-gray-500 dark:hover:bg-gray-600 dark:disabled:bg-gray-900`,
    ];
  if (success)
    return [
      soft
        ? `bg-success-100 text-success-700 hover:bg-success-200`
        : `bg-success-200 text-success-700 hover:bg-success-300`,
      ghost &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-success-800`,
      `dark:text-success-200 dark:bg-success-900 dark:hover:bg-success-800 dark:disabled:bg-gray-900`,
    ];
  if (danger)
    return [
      soft
        ? `bg-danger-100 text-danger-600 hover:bg-danger-200`
        : `bg-danger-200 text-danger-700 hover:bg-danger-300`,
      ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-danger-800`,
      `dark:text-danger-200 dark:bg-danger-900 dark:hover:bg-danger-800 dark:disabled:bg-gray-900`,
    ];
  if (warning)
    return [
      soft
        ? `bg-warning-100 text-warning-600 hover:bg-warning-200`
        : `bg-warning-200 text-warning-700 hover:bg-warning-300`,
      ghost &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-warning-800`,
      `dark:text-warning-200 dark:bg-warning-900 dark:hover:bg-warning-800 dark:disabled:bg-gray-900`,
    ];
  if (info)
    return [
      soft
        ? `bg-info-100 text-info-600 hover:bg-info-200`
        : `bg-info-200 text-info-700 hover:bg-info-300`,
      ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-info-800`,
      `dark:text-info-200 dark:bg-info-900 dark:hover:bg-info-800 dark:disabled:bg-gray-900`,
    ];
  if (gray)
    return [
      soft
        ? `bg-gray-100 text-gray-600 hover:bg-gray-200`
        : `bg-gray-200 text-gray-700 hover:bg-gray-300`,
      ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
      `dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-900`,
    ];

  return [
    soft
      ? `bg-primary-100 text-primary-600 hover:bg-primary-200`
      : `bg-primary-200 text-primary-700 hover:bg-primary-300`,
    ghost && `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
    `dark:text-primary-50 dark:bg-primary-900 dark:hover:bg-primary-800 dark:disabled:bg-gray-900`,
  ];
};
