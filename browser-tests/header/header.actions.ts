/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import { DEFAULT_LANGUAGE, SUPPORT_LANGUAGES } from '../../src/constants';
import { headerSelectors } from './header.selectors';

export const getHeaderActions = (t: TestController) => ({
  async changeLanguage(from: SUPPORT_LANGUAGES, to: SUPPORT_LANGUAGES) {
    const selectors = headerSelectors(from);
    await t
      .click(selectors.languageSelector())
      .click(selectors.languageSelectorItem(to));
  },
  async clickEventSearchPageTab(locale = DEFAULT_LANGUAGE) {
    await t.click(headerSelectors(locale).eventSearchTab());
  },
  async clickRecommendationsPageTab(locale = DEFAULT_LANGUAGE) {
    await t.click(headerSelectors(locale).recommendationsTab());
  },
});
