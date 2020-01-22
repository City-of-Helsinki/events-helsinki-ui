import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import I18nextFsBackend from "i18next-node-fs-backend";
import { initReactI18next } from "react-i18next";

import config from "./config";

const extendedConfig = {
  ...config,
  backend: {
    addPath: __dirname + "../{{ns}}.missing.json",
    loadPath: __dirname + "../{{ns}}.json"
  }
};

i18next
  .use(initReactI18next)
  .use(I18nextFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(extendedConfig);

export default i18next;
