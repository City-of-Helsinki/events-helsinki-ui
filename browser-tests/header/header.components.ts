/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import translationsEn from '../../src/common/translation/i18n/en.json';
import translationsFi from '../../src/common/translation/i18n/fi.json';
import translationsSv from '../../src/common/translation/i18n/sv.json';
import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';
import {
  getErrorMessage,
  screenContext,
  withinContext,
} from '../utils/testcafe.utils';

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

export const findHeader = async (
  t: TestController,
  locale = DEFAULT_LANGUAGE
) => {
  t.ctx.expectedLanguage = locale;
  const within = withinContext(t);
  const screen = screenContext(t);

  await t
    .expect(screen.findByRole('banner').exists)
    .ok(await getErrorMessage(t));

  const withinHeader = () => {
    return within(screen.getByRole('banner'));
  };
  const languageSelector = () => {
    const selectors = {
      languageSelector() {
        return withinHeader().findByRole('button', {
          name: getTranslations(t.ctx.expectedLanguage).header.changeLanguage,
        });
      },
      languageSelectorItem(lang: SUPPORT_LANGUAGES) {
        return withinHeader().findByRole('link', {
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
      actions,
    };
  };
  const headerTabs = () => {
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
      expectations,
      actions,
    };
  };
  return {
    languageSelector,
    headerTabs,
  };
};
