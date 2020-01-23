import i18next from "i18next";
import BrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import config from "./config";

if (!i18next.isInitialized) {
  i18next
    .use(initReactI18next)
    .use(BrowserLanguageDetector)
    .init(config);
}

export default i18next;
