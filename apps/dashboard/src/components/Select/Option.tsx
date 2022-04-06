import { clsx } from "core-utils";

import { ISelectOption } from ".";

interface IProps {
  onChange: (option: ISelectOption) => void;
  isFirst: boolean;
  isLast: boolean;
  option: ISelectOption;
}

const Option: React.FC<IProps> = ({ option, isFirst, isLast, onChange }) => (
  <li
    className={clsx([
      "py-3 px-3",
      "cursor-pointer",
      isFirst && "rounded-t",
      isLast && "rounded-b-sm",
      "text-sm font-normal leading-3 tracking-normal",
      " hover:bg-primary-200 dark:hover:bg-primary-800 dark:text-gray-200 ",
    ])}
    onClick={() => onChange(option)}
  >
    {option.label}
  </li>
);

export default Option;
