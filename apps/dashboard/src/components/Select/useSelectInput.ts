import { useEffect, useState } from "react";

import { ISelectOption } from ".";

export interface IProps {
  onChange: (value: ISelectOption) => void;
  initialValue?: ISelectOption;
  value?: ISelectOption;
}

export const useSelect = ({ onChange, initialValue, value }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenSelectOptions = () => setIsOpen((prev) => !prev);
  const handleSelectionChange = (changedValue: ISelectOption) => {
    toggleOpenSelectOptions();
    onChange(changedValue);
  };

  useEffect(() => {
    if (initialValue && initialValue?.value !== value?.value)
      onChange(initialValue);
  }, [initialValue]);

  return {
    handleSelectionChange,
    toggleOpenSelectOptions,
    isOpen,
  };
};
