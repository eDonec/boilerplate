import { clsx } from "core-utils";

import { ISelectOption } from "../Select";

interface IProps {
  isFirst: boolean;
  isLast: boolean;
  option: ISelectOption;
  error?: string;
}

const Option: React.FC<IProps> = ({ option, isFirst, isLast, error }) => (
  <li
    className={clsx([
      "py-3 px-3",
      "cursor-pointer",
      isFirst && "rounded-t",
      isLast && "rounded-b-sm",
      "text-sm font-normal leading-3 tracking-normal",
      " hover:bg-primary-200 dark:hover:bg-primary-800 dark:text-gray-200 ",
      error && "text-red-600 dark:text-red-500",
    ])}
  >
    {option.label}
  </li>
);

export default Option;
