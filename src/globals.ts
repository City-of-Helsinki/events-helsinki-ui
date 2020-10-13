import { Language } from './types';

declare global {
  interface Window {
    initialI18nStore: Record<string, unknown>;
    initialLanguage: Language;
  }
}
