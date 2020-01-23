import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import { initReactI18next } from "react-i18next";

import config from "./config";

i18next
  .use(initReactI18next)
  .use(i18nextMiddleware.LanguageDetector)
  .init(config);

export default i18next;
