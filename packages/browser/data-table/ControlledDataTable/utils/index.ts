import { ISelectOption } from "forms/Select";

export const formatLimit = (limit: string): ISelectOption<string> => ({
  label: `${limit}`,
  value: `${limit}`,
});

export const formatLimitOptions = (
  limitOptions: string[]
): ISelectOption<string>[] =>
  limitOptions.sort((a, b) => Number(a) - Number(b)).map(formatLimit);
