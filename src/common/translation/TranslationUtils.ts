import { i18n as I18nInstanceType, TFunction, TOptions } from "i18next";

import i18n from "./i18n/i18nInit";

/**
 * formatMessage()
 * This function is equivalent with t from useTranslation hook
 * to translate your content.
 * Purpose of using this function instead of hook for HOC is for easier maintain
 *
 * @param key Key of the string to translate
 * @param options Options of the string to translate
 */
export const formatMessage: TFunction = (
  key: string,
  options?: TOptions | string
) => i18n.t(key, options);

export const changeLanguage = (language: string) =>
  i18n.changeLanguage(language);

/**
 * Safety check in case
 * somehow i18n have problem or have empty languages.
 */
export const getCurrentLanguage = (i18n: I18nInstanceType) =>
  (i18n && i18n.languages && i18n.languages[0]) || "fi";
