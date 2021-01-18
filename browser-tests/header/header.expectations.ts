/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import TestController from 'testcafe';

import { DEFAULT_LANGUAGE } from '../../src/constants';
import { getPageTitle, getPathname } from '../utils/browserUtils';
import { headerSelectors } from './header.selectors';

export const getHeaderExpectations = (t: TestController) => ({
  async eventSearchPageTabIsVisible(locale = DEFAULT_LANGUAGE) {
    await t.expect(headerSelectors(locale).eventSearchTab().exists).ok();
  },
  async recommendationsPageTabIsVisible(locale = DEFAULT_LANGUAGE) {
    await t.expect(headerSelectors(locale).recommendationsTab().exists).ok();
  },
  async urlChangedToEventSearchPage() {
    await t
      .expect(getPathname())
      .eql(`/fi/events`)
      .expect(getPageTitle())
      .eql('Tapahtumat');
  },
  async urlChangedToRecommendationsPage() {
    await t
      .expect(getPathname())
      .eql(`/fi/collections`)
      .expect(getPageTitle())
      .eql('Tapahtumat');
  },
});
