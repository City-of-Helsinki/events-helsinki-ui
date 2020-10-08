import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import fi from '../common/translation/i18n/fi.json';
import { DEFAULT_LANGUAGE } from '../constants';

i18n.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  resources: {
    fi: {
      translation: fi,
    },
  },
});

export default i18n;
