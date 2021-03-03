import { render } from '@testing-library/react';
import * as React from 'react';

import { LandingPageFieldsFragment } from '../../../../generated/graphql';
import { fakeBanner, fakeLandingPage } from '../../../../test/mockDataUtils';
import { actWait } from '../../../../test/testUtils';
import LandingPageMeta from '../LandingPageMeta';

const landingPageTitle = 'Landing page title';
const landingPageDescription = 'Landing page description';
const landingPageKeyword = 'landing page keyword';
const topBannerImage = 'www.topbannerurl.fi';
const bottomBannerImage = 'www.bottombannerurl.fi';
const landingPage = fakeLandingPage({
  metaInformation: { fi: landingPageDescription },
  pageTitle: { fi: landingPageTitle },
  keywords: { fi: [landingPageKeyword] },
  topBanner: fakeBanner({
    socialMediaImage: { fi: { url: topBannerImage } },
  }),
  bottomBanner: fakeBanner({
    socialMediaImage: { fi: { url: bottomBannerImage } },
  }),
}) as LandingPageFieldsFragment;

// Rendering EventPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `EventPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialHeadInnerHTML: any = null;

beforeEach(() => {
  const head = document.querySelector('head');
  initialHeadInnerHTML = head.innerHTML;

  document.head.innerHTML = '';
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test('applies expected metadata', async () => {
  render(<LandingPageMeta landingPage={landingPage} />);

  await actWait(300);

  const title = document.title;
  const head = document.querySelector('head');
  const metaDescription = head.querySelector('[name="description"]');
  const metaKeywords = head.querySelector('[name="keywords"]');
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  const ogImages = head.querySelectorAll('[property="og:image"]');

  expect(title).toEqual(landingPageTitle);
  expect(metaDescription).toHaveAttribute('content', landingPageDescription);
  expect(metaKeywords).toHaveAttribute('content', landingPageKeyword);
  expect(ogTitle).toHaveAttribute('content', landingPageTitle);
  expect(ogDescription).toHaveAttribute('content', landingPageDescription);
  expect(ogImages).toHaveLength(2);
  expect(ogImages[0]).toHaveAttribute('content', topBannerImage);
  expect(ogImages[1]).toHaveAttribute('content', bottomBannerImage);
});
