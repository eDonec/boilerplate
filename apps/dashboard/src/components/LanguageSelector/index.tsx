import i18next from "i18next";

import Select from "components/Select";

import { handleLanguageChange, LanguageList } from "./useLanguageSelector";

const LanguageSelector = () => (
  <Select
    options={LanguageList}
    onChange={handleLanguageChange}
    label="Language Selector"
    value={{
      label: i18next.language === "fr" ? "Français" : "English",
      value: i18next.language,
    }}
  />
);

export default LanguageSelector;
