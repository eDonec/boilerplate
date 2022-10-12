import { ISelectOption } from "forms/Select/types";
import { changeLanguage } from "i18next";

export const handleLanguageChange = (selection: ISelectOption) => {
  changeLanguage(selection.value);
};
export const LanguageList = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];
