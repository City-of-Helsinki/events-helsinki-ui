import { InitOptions } from 'i18next';

import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../../constants';
import en from './en.json';
import fi from './fi.json';
import sv from './sv.json';

const i18Config: InitOptions = {
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  load: 'languageOnly',
  preload: ['fi', 'en', 'sv'],
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
  whitelist: [SUPPORT_LANGUAGES.EN, SUPPORT_LANGUAGES.FI, SUPPORT_LANGUAGES.SV],
};

export default i18Config;
