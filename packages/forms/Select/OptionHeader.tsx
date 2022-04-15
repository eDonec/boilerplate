import { clsx } from "core-utils";

import Shevron from "./Shevron";
import { ISelectOption } from "./types";

export interface IProps {
  initialValue?: ISelectOption;
  unsetLabel?: string;
  value?: ISelectOption;
  toggleOpenSelectOptions: () => void;
  isOpen: boolean;
  error?: string;
}
export const OptionHeader: React.FC<IProps> = ({
  initialValue,
  unsetLabel,
  value,
  toggleOpenSelectOptions,
  isOpen,
  error,
}) => (
  <div
    className={clsx([
      "flex w-48",
      "cursor-pointer",
      "items-center justify-between",
      "rounded border",
      !error && "dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200",
      error && "border-red-500 bg-red-50 text-red-600 ",
      error &&
        "dark:border-red-400 dark:bg-red-100 dark:text-red-700 dark:focus:border-red-500 ",
    ])}
    onClick={toggleOpenSelectOptions}
  >
    <p className="py-3 pl-3 text-sm leading-3 tracking-normal">
      {value?.label || initialValue?.label || unsetLabel}
    </p>

    <Shevron isUp={isOpen} error={error} />
  </div>
);

export default OptionHeader;