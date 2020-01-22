import i18next from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import config from "./config";
import en from "./en.json";
import fi from "./fi.json";
import sv from "./sv.json";

const extendedConfig = {
  ...config,
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
  }
};

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(BrowserLanguageDetector)
    .init(extendedConfig);
}

export default i18next;
