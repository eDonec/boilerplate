import { ButtonVariant } from "../Button";

//#region  //*=========== Variants ===========
export const getVariantsClsx = (
  {
    ghost,
    light,
    success,
    gray,
    info,
    danger,
    warning,
  }: { [key in ButtonVariant]?: boolean },
  soft: boolean,
  outline: boolean
) => {
  if (light)
    return [
      soft ? `text-gray-600` : `text-dark `,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
      outline && !soft && "border border-gray-500 dark:border-gray-50",
      outline && soft && "border border-gray-200 dark:border-gray-50",
      `hover:bg-gray-100 bg-white active:bg-white/80 disabled:bg-gray-200`,
      `dark:text-gray-50 dark:bg-gray-500 dark:hover:bg-gray-600 dark:disabled:bg-gray-900`,
    ];
  if (success)
    return [
      outline && !soft && "border border-success-500 dark:border-success-50",
      outline && soft && "border border-success-200 dark:border-success-50",
      soft
        ? `bg-success-100 text-success-700 hover:bg-success-200`
        : `bg-success-200 text-success-700 hover:bg-success-300`,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-success-800`,
      `dark:text-success-200 dark:bg-success-900 dark:hover:bg-success-800 dark:disabled:bg-gray-900`,
    ];
  if (danger)
    return [
      outline && !soft && "border border-danger-500 dark:border-danger-50",
      outline && soft && "border border-danger-200 dark:border-danger-50",
      soft
        ? `bg-danger-100 text-danger-600 hover:bg-danger-200`
        : `bg-danger-200 text-danger-700 hover:bg-danger-300`,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-danger-800`,
      `dark:text-danger-200 dark:bg-danger-900 dark:hover:bg-danger-800 dark:disabled:bg-gray-900`,
    ];
  if (warning)
    return [
      outline && !soft && "border border-warning-500 dark:border-warning-50",
      outline && soft && "border border-warning-200 dark:border-warning-50",
      soft
        ? `bg-warning-100 text-warning-600 hover:bg-warning-200`
        : `bg-warning-200 text-warning-700 hover:bg-warning-300`,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-warning-800`,
      `dark:text-warning-200 dark:bg-warning-900 dark:hover:bg-warning-800 dark:disabled:bg-gray-900`,
    ];
  if (info)
    return [
      outline && !soft && "border border-info-500 dark:border-info-50",
      outline && soft && "border border-info-200 dark:border-info-50",
      soft
        ? `bg-info-100 text-info-600 hover:bg-info-200`
        : `bg-info-200 text-info-700 hover:bg-info-300`,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-info-800`,
      `dark:text-info-200 dark:bg-info-900 dark:hover:bg-info-800 dark:disabled:bg-gray-900`,
    ];
  if (gray)
    return [
      outline && !soft && "border border-gray-500 dark:border-gray-50",
      outline && soft && "border border-gray-200 dark:border-gray-50",
      soft
        ? `bg-gray-100 text-gray-600 hover:bg-gray-200`
        : `bg-gray-200 text-gray-700 hover:bg-gray-300`,
      (ghost || outline) &&
        `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
      `dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:disabled:bg-gray-900`,
    ];

  return [
    outline && !soft && "border border-primary-500 dark:border-primary-50",
    outline && soft && "border border-primary-200 dark:border-primary-50",
    soft && !outline
      ? `bg-primary-100 text-primary-600 hover:bg-primary-200`
      : `bg-primary-200 text-primary-700 hover:bg-primary-300`,
    (ghost || outline) &&
      `!bg-transparent dark:!bg-transparent dark:hover:!bg-gray-600`,
    `dark:text-primary-50 dark:bg-primary-900 dark:hover:bg-primary-800 dark:disabled:bg-gray-900`,
  ];
};
