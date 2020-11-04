import { Resource } from 'i18next';

import { Language } from './types';

declare global {
  interface Window {
    initialI18nStore: Resource;
    initialLanguage: Language;
  }
}
