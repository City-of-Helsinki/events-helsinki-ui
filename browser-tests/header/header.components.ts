/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { screen, within } from '@testing-library/testcafe';
import TestController from 'testcafe';

import translationsEn from '../../src/common/translation/i18n/en.json';
import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';
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

export const getHeaderComponents = (
  t: TestController,
  locale = DEFAULT_LANGUAGE
) => {
  t.ctx.expectedLanguage = locale;
  const component = () => {
    return screen.findByRole('banner');
  };
  const withinComponent = () => {
    return within(screen.getByRole('banner'));
  };
  const languageSelector = () => {
    const selectors = {
      languageSelector() {
        return withinComponent().findByRole('button', {
          name: getTranslations(t.ctx.expectedLanguage).header.changeLanguage,
        });
      },
      languageSelectorItem(lang: SUPPORT_LANGUAGES) {
        return withinComponent().findByRole('menuitem', {
          name: getTranslations(t.ctx.expectedLanguage).header.languages[lang],
        });
      },
      eventSearchTab() {
        return withinComponent().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header.searchEvents,
        });
      },
      recommendationsTab() {
        return withinComponent().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header
            .searchCollections,
        });
      },
    };
    const expectations = {
      async isPresent() {
        await t.expect(component().exists).ok(getErrorMessage(t));
      },
    };
    const actions = {
      async changeLanguage(lang: SUPPORT_LANGUAGES) {
        await expectations.isPresent();
        const result = await t
          .click(selectors.languageSelector())
          .click(selectors.languageSelectorItem(lang));
        t.ctx.expectedLanguage = lang;
        return result;
      },
    };

    return {
      selectors,
      expectations,
      actions,
    };
  };
  const tabs = () => {
    const selectors = {
      eventSearchTab() {
        return withinComponent().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header.searchEvents,
        });
      },
      recommendationsTab() {
        return withinComponent().findByRole('link', {
          name: getTranslations(t.ctx.expectedLanguage).header
            .searchCollections,
        });
      },
    };
    const expectations = {
      async isPresent() {
        await t.expect(component().exists).ok(getErrorMessage(t));
      },
      async eventSearchPageTabIsVisible() {
        await this.isPresent();
        await t
          .expect(selectors.eventSearchTab().exists)
          .ok(getErrorMessage(t));
      },
      async recommendationsPageTabIsVisible() {
        await this.isPresent();
        await t
          .expect(selectors.recommendationsTab().exists)
          .ok(getErrorMessage(t));
      },
    };
    const actions = {
      async clickEventSearchPageTab() {
        await expectations.isPresent();
        await t.click(selectors.eventSearchTab());
      },
      async clickRecommendationsPageTab() {
        await expectations.isPresent();
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
    tabs,
  };
};
