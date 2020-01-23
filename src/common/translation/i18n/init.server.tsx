import fs from "fs";
import i18next from "i18next";
import i18nextMiddleware from "i18next-express-middleware";
import I18nextFsBackend from "i18next-node-fs-backend";
import path from "path";
import { initReactI18next } from "react-i18next";

import config from "./config";

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath: string) =>
  path.resolve(appDirectory, relativePath);
const appSrc = resolveApp("src");

const extendedConfig = {
  ...config,
  backend: {
    addPath: appSrc + "/common/translation/i18n/{{lng}}.missing.json",
    loadPath: appSrc + "/common/translation/i18n/{{lng}}.json"
  }
};

i18next
  .use(initReactI18next)
  .use(I18nextFsBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(extendedConfig);

export default i18next;
