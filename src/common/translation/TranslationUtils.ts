import { i18n as I18nInstanceType } from 'i18next';

import { DEFAULT_LANGUAGE } from '../../constants';

/**
 * Safety check in case
 * somehow i18n have problem or have empty languages.
 */
export const getCurrentLanguage = (i18n: I18nInstanceType): string =>
  (i18n && i18n.languages && i18n.languages[0]) || DEFAULT_LANGUAGE;
