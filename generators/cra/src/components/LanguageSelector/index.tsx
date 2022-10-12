import Select from "forms/Select/RawSelect";
import i18next from "i18next";

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
