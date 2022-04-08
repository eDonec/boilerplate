import { initReactI18next } from "react-i18next";

import i18n from "i18next";

import translationEN from "./en/translation.json";
import translationFR from "./fr/translation.json";

i18n.use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init({
    resources: {
      en: {
        translations: translationEN,
      },
      fr: {
        translations: translationFR,
      },
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    saveMissing: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".",
    load: "languageOnly",

    interpolation: {
      escapeValue: false,
    },
  });
}
export default i18n;
