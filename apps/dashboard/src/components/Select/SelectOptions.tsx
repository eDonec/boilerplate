import { clsx } from "core-utils";

import { ISelectOption } from ".";
import Option from "./Option";

interface IProps {
  options: ISelectOption[];
  onChange: (option: ISelectOption) => void;
}
const SelectOptions: React.FC<IProps> = ({ options, onChange }) => (
  <ul
    className={clsx([
      "absolute mt-1 w-48",
      "rounded border",
      "duration-300 ",
      " bg-white dark:bg-gray-700",
    ])}
  >
    {options.map((option, index) => (
      <Option
        key={option.value}
        option={option}
        onChange={onChange}
        isFirst={index === 0}
        isLast={index === options.length - 1}
      />
    ))}
  </ul>
);

export default SelectOptions;
