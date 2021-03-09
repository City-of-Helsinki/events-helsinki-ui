import { InitOptions } from 'i18next';

import { DEFAULT_LANGUAGE, supportedLanguages } from '../../../constants';
import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';

const i18Config: InitOptions = {
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  load: 'languageOnly',
  preload: supportedLanguages,
  react: {
    useSuspense: false,
  },
  resources: {
    en: {
      translation: en,
    },
    fi: {
      translation: fi,
    },
    sv: {
      translation: sv,
    },
  },
  saveMissing: true,
  whitelist: supportedLanguages,
};

export default i18Config;
