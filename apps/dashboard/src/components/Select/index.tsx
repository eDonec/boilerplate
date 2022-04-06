import { clsx } from "core-utils";

import OptionHeader from "./OptionHeader";
import SelectOptions from "./SelectOptions";
import { useSelect } from "./useSelectInput";

export interface ISelectOption<T = string> {
  value: T;
  label: string;
}

interface IProps<T = string> {
  options: ISelectOption<T>[];
  onChange: (value: ISelectOption<T>) => void;
  initialValue?: ISelectOption<T>;
  label?: string;
  unsetLabel?: string;
  value?: ISelectOption<T>;
}

const Select: React.FC<IProps> = ({
  options,
  onChange,
  initialValue,
  label,
  value,
}) => {
  const { handleSelectionChange, isOpen, toggleOpenSelectOptions } = useSelect({
    onChange,
    initialValue,
    value,
  });

  return (
    <div className=" border-gray-400 text-gray-600 ">
      <p>{label}</p>

      <OptionHeader
        isOpen={isOpen}
        unsetLabel="Language"
        value={value}
        toggleOpenSelectOptions={toggleOpenSelectOptions}
      />

      {isOpen && (
        <div
          className={clsx([
            "fixed",
            "top-0 left-0 -z-0",
            "min-h-screen min-w-[100vw]",
            "bg-transparent",
          ])}
          onClick={toggleOpenSelectOptions}
        />
      )}
      {isOpen && (
        <SelectOptions onChange={handleSelectionChange} options={options} />
      )}
    </div>
  );
};

export default Select;
