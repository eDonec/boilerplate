import { useEffect, useState } from "react";

import { ISelectOption } from "../Select";

export interface IProps {
  onChange?: (value: ISelectOption[]) => void;
  initialValue?: ISelectOption[];
  value?: ISelectOption[];
  options: ISelectOption[];
}

export const useMultiSelectInput = ({
  onChange,
  initialValue,
  value = [],
  options,
}: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenSelectOptions = (open: boolean) => setIsOpen(open);
  const handleSelectionChange = (changedValue: ISelectOption) => {
    toggleOpenSelectOptions(false);

    if (value?.map((el) => el.value).includes(changedValue.value)) {
      onChange?.(value.filter((el) => el.value !== changedValue.value));
    } else {
      onChange?.([...value, changedValue]);
    }
  };

  useEffect(() => {
    if (
      initialValue &&
      !initialValue.every((v) => value?.map((el) => el.value).includes(v.value))
    )
      onChange?.(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!value.every((v) => options.map((el) => el.value).includes(v.value))) {
      onChange?.(
        value.filter((v) => options.map((el) => el.value).includes(v.value))
      );
    }
  }, [value, options]);

  return {
    handleSelectionChange,
    toggleOpenSelectOptions,
    isOpen,
  };
};
