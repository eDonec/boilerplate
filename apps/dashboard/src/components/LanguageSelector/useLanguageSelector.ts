import { changeLanguage } from "i18next";

import { ISelectOption } from "components/Select";

export const handleLanguageChange = (selection: ISelectOption) => {
  changeLanguage(selection.value);
};
export const LanguageList = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
];
