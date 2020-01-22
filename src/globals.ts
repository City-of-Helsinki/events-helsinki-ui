import { Language } from "./types";

declare global {
  interface Window {
    initialI18nStore: object;
    initialLanguage: Language;
  }
}
