import { clsx } from "core-utils";
import ReactChildrenProps from "shared-types/ReactChildren";

interface IProps {
  onClick: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  disabled?: boolean;
  isActive?: boolean;
}
const ButtonGroupButton = ({
  onClick,
  isActive,
  isFirst,
  isLast,
  children,
  disabled,
}: IProps & ReactChildrenProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      { "border-t border-b": !isLast && !isFirst },
      { border: isFirst || isLast },
      { "rounded-l-lg": isFirst },
      { "rounded-r-md": isLast },
      {
        "bg-sucess-700 dark:bg-success-700 text-white dark:text-white":
          isActive,
      },
      { "bg-white text-gray-900 dark:bg-gray-700 dark:text-white": !isActive },
      "border-gray-200  px-4 py-2 text-sm font-medium",
      "hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700",
      "dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
    )}
  >
    {children}
  </button>
);

export default ButtonGroupButton;
