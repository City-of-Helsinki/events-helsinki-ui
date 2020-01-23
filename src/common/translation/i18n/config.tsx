import { InitOptions } from "i18next";

import en from "./en.json";
import fi from "./fi.json";
import sv from "./sv.json";

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
  resources: {
    en: {
      translation: en
    },
    fi: {
      translation: fi
    },
    sv: {
      translation: sv
    }
  },
  saveMissing: true
};

export default i18Config;
