import { clsx } from "core-utils";

import { ISelectOption } from ".";
import Shevron from "./Shevron";

export interface IProps {
  initialValue?: ISelectOption;
  unsetLabel?: string;
  value?: ISelectOption;
  toggleOpenSelectOptions: () => void;
  isOpen: boolean;
}
const OptionHeader: React.FC<IProps> = ({
  initialValue,
  unsetLabel,
  value,
  toggleOpenSelectOptions,
  isOpen,
}) => (
  <div
    className={clsx([
      "flex w-48",
      "cursor-pointer",
      "items-center justify-between",
      "rounded border",
      "dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200",
    ])}
    onClick={toggleOpenSelectOptions}
  >
    <p className="py-3 pl-3 text-sm leading-3 tracking-normal">
      {value?.label || initialValue?.label || unsetLabel}
    </p>
    <Shevron isUp={isOpen} />
  </div>
);

export default OptionHeader;
