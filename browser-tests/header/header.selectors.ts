/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';

import translationsEn from '../../src/common/translation/i18n/en.json';
import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';

const getTranslations = (locale: SUPPORT_LANGUAGES) => {
  switch (locale) {
    case SUPPORT_LANGUAGES.EN:
      return translationsEn;
    case SUPPORT_LANGUAGES.SV:
      return translationsSv;
    default:
      return translationsFi;
  }
};

export const headerSelectors = (locale = DEFAULT_LANGUAGE) => {
  const withinHeader = () => within(screen.getByRole('banner'));
  return {
    languageSelector() {
      return withinHeader().getByRole('button', {
        name: getTranslations(locale).header.changeLanguage,
      });
    },
    languageSelectorItem(locale = DEFAULT_LANGUAGE) {
      return withinHeader().getByRole('menuitem', {
        name: getTranslations(locale).header.languages[locale],
      });
    },
    eventSearchTab() {
      return withinHeader().getByRole('link', {
        name: getTranslations(locale).header.searchEvents,
      });
    },
    recommendationsTab() {
      return withinHeader().getByRole('link', {
        name: getTranslations(locale).header.searchCollections,
      });
    },
  };
};
