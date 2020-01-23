import { InitOptions } from "i18next";

const i18Config: InitOptions = {
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false
  },
  load: "languageOnly",
  preload: ["fi", "en", "sv"],
  react: {
    useSuspense: false
  },
  saveMissing: true
};

export default i18Config;
