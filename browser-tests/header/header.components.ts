/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import translationsEn from '../../src/common/translation/i18n/en.json';
import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';
import { withinContext } from '../utils/context.util';
import { getErrorMessage } from '../utils/error.util';

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

export const getHeader = (t: TestController, locale = DEFAULT_LANGUAGE) => {
  t.ctx.expectedLanguage = locale;
  const header = () => {
    return screen.findByRole('banner');
  };
  const withinHeader = () => {
    return withinContext(t, within(screen.getByRole('banner')));
  };
  const isHeaderPresent = async () => {
    await t.expect(header().exists).ok(await getErrorMessage(t));
  };
  const languageSelector = async () => {
    await isHeaderPresent();
    const selectors = {
      languageSelector() {
        return withinHeader().findByRole('button', {
          name: getTranslations(t.ctx.expectedLanguage).header.changeLanguage,
        });
      },
      languageSelectorItem(lang: SUPPORT_LANGUAGES) {
        return withinHeader().findByRole('menuitem', {
          name: getTranslations(t.ctx.expectedLanguage).header.languages[lang],
        });
      },
      eventSearchTab() {
        return withinHeader().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header.searchEvents,
        });
      },
      recommendationsTab() {
        return withinHeader().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header
            .searchCollections,
        });
      },
    };
    const actions = {
      async changeLanguage(lang: SUPPORT_LANGUAGES) {
        const result = await t
          .click(selectors.languageSelector())
          .click(selectors.languageSelectorItem(lang));
        t.ctx.expectedLanguage = lang;
        return result;
      },
    };
    return {
      selectors,
      actions,
    };
  };
  const headerTabs = async () => {
    await isHeaderPresent();
    const selectors = {
      eventSearchTab() {
        return withinHeader().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header.searchEvents,
        });
      },
      recommendationsTab() {
        return withinHeader().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header
            .searchCollections,
        });
      },
    };
    const expectations = {
      async eventSearchPageTabIsVisible() {
        await t
          .expect(selectors.eventSearchTab().exists)
          .ok(await getErrorMessage(t));
      },
      async recommendationsPageTabIsVisible() {
        await t
          .expect(selectors.recommendationsTab().exists)
          .ok(await getErrorMessage(t));
      },
    };
    const actions = {
      async clickEventSearchPageTab() {
        await t.click(selectors.eventSearchTab());
      },
      async clickRecommendationsPageTab() {
        await t.click(selectors.recommendationsTab());
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  return {
    languageSelector,
    headerTabs,
  };
};
