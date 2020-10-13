import i18next from 'i18next';
import i18nextMiddleware from 'i18next-express-middleware';
import { initReactI18next } from 'react-i18next';

import config from './config';

const languageDetectorOptions = {
  // order and from where user language should be detected
  order: ['path', 'cookie', 'header'],
};

i18next
  .use(initReactI18next)
  .use(i18nextMiddleware.LanguageDetector)
  .init({ ...config, detection: languageDetectorOptions });

export default i18next;
