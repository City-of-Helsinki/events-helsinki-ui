import { render } from '@testing-library/react';
import React from 'react';

import { LandingPageFieldsFragment } from '../../../../generated/graphql';
import { fakeLandingPage } from '../../../../util/mockDataUtils';
import { actWait } from '../../../../util/testUtils';
import LandingPageMeta from '../LandingPageMeta';

const landingPageTitle = 'Landing page title';
const landingPageDescription = 'Landing page description';
const landingPageImage = 'www.testurl.fi';
const landingPage = fakeLandingPage({
  socialMediaImage: { fi: { url: landingPageImage } },
  metaInformation: { fi: landingPageDescription },
  pageTitle: { fi: landingPageTitle },
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
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  const ogImage = head.querySelector('[property="og:image"]');

  expect(title).toEqual(landingPageTitle);
  expect(metaDescription).toHaveAttribute('content', landingPageDescription);
  expect(ogTitle).toHaveAttribute('content', landingPageTitle);
  expect(ogDescription).toHaveAttribute('content', landingPageDescription);
  expect(ogImage).toHaveAttribute('content', landingPageImage);
});
