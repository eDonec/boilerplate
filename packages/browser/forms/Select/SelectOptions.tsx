import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { clsx } from "core-utils";

import Option from "./Option";
import { ISelectOption } from "./types";

interface IProps {
  options: ISelectOption[];
  onChange: (option: ISelectOption) => void;
}
const SelectOptions: React.FC<IProps> = ({ options, onChange }) => (
  <ul
    className={clsx([
      "rounded border",
      "duration-300 ",
      " bg-white dark:bg-gray-700",
      "z-50",
    ])}
  >
    {options.map((option, index) => (
      <DropdownMenu.Item
        onSelect={() => onChange(option)}
        key={option.value}
        asChild
        className={clsx([
          "py-3 px-3",
          "cursor-pointer",
          index === 0 && "rounded-t",
          index === options.length - 1 && "rounded-b-sm",
          "text-sm font-normal leading-3 tracking-normal",
          " hover:bg-primary-200 dark:hover:bg-primary-800 dark:text-gray-200 ",
          false && "text-red-600 dark:text-red-500",
        ])}
      >
        <Option
          option={option}
          isFirst={index === 0}
          isLast={index === options.length - 1}
        />
      </DropdownMenu.Item>
    ))}
  </ul>
);

export default SelectOptions;
