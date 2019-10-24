import { FormatFunction } from "i18next";

import i18n from "./i18n/i18nInit";

/**
 * formatMessage()
 * This function is equivalent with t from useTranslation hook
 * to translate your content.
 * Purpose of using this function instead of hook for HOC is for easier maintain
 *
 * @param args Format arguments, check ts definition / i18next documentation
 */
export const formatMessage: FormatFunction = args => i18n.t(args);

export const changeLanguage = (language: string) =>
  i18n.changeLanguage(language);
