import { initReactI18next } from "react-i18next";

import i18n from "i18next";
import translationEN from "locales/en/translation.json";
import translationFR from "locales/fr/translation.json";

i18n.use(initReactI18next);

if (!i18n.isInitialized) {
  i18n.init({
    // we init with resources
    resources: {
      en: {
        translations: translationEN,
      },
      fr: {
        translations: translationFR,
      },
    },
    fallbackLng: ["en", "fr"],
    debug: process.env.NODE_ENV === "development",
    saveMissing: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".",
    load: "languageOnly", // we only provide en, de -> no region specific locals like en-US, de-DE

    interpolation: {
      escapeValue: false,
    },
  });
}
export default i18n;
