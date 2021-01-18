/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

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

export const getHeaderComponents = (
  t: TestController,
  locale = DEFAULT_LANGUAGE
) => {
  t.ctx.locale = locale;
  const component = () => {
    return within(screen.getByRole('banner'));
  };
  const languageSelector = () => {
    const selectors = {
      languageSelector() {
        return component().getByRole('button', {
          name: getTranslations(t.ctx.locale).header.changeLanguage,
        });
      },
      languageSelectorItem(lang: SUPPORT_LANGUAGES) {
        return component().getByRole('menuitem', {
          name: getTranslations(t.ctx.locale).header.languages[lang],
        });
      },
      eventSearchTab() {
        return component().getByRole('link', {
          name: getTranslations(t.ctx.locale).header.searchEvents,
        });
      },
      recommendationsTab() {
        return component().getByRole('link', {
          name: getTranslations(t.ctx.locale).header.searchCollections,
        });
      },
    };
    const actions = {
      async changeLanguage(lang: SUPPORT_LANGUAGES) {
        const result = await t
          .click(selectors.languageSelector())
          .click(selectors.languageSelectorItem(lang));
        t.ctx.locale = lang;
        return result;
      },
    };
    const expectations = {};
    return {
      selectors,
      actions,
      expectations,
    };
  };
  const tabs = () => {
    const selectors = {
      eventSearchTab() {
        return component().getByRole('link', {
          name: getTranslations(t.ctx.locale).header.searchEvents,
        });
      },
      recommendationsTab() {
        return component().getByRole('link', {
          name: getTranslations(t.ctx.locale).header.searchCollections,
        });
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
    const expectations = {
      async eventSearchPageTabIsVisible() {
        await t.expect(selectors.eventSearchTab().exists).ok();
      },
      async recommendationsPageTabIsVisible() {
        await t.expect(selectors.recommendationsTab().exists).ok();
      },
    };
    return {
      selectors,
      actions,
      expectations,
    };
  };
  return {
    languageSelector,
    tabs,
  };
};
