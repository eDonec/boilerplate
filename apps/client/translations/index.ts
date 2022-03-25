import i18n from "i18next";

import translationEN from "./locales/en.json";
import translationFR from "./locales/fr.json";

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
  });
}
export default i18n;
