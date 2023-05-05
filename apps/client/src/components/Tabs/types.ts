import { ISelectOption } from "forms/Select/types";

export type TabsProps<T> = {
  className?: string;
  tabs: ISelectOption<T>[];
  value: T;
  onChange?: (value: T) => void;
};
