import { render } from '@testing-library/react';
import React from 'react';

import { CollectionFieldsFragment } from '../../../../generated/graphql';
import { fakeCollection } from '../../../../util/mockDataUtils';
import { actWait } from '../../../../util/testUtils';
import CollectionPageMeta from '../CollectionPageMeta';

const image = 'https://localhost/example/path';
const title = 'Collection title';
const socialMediaDescription = 'Collection description';

const collection = fakeCollection({
  heroImage: { url: image },
  socialMediaDescription: { fi: socialMediaDescription },
  title: { fi: title },
}) as CollectionFieldsFragment;

// Rendering CollectionPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `CollectionPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let initialHeadInnerHTML: any = null;

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const head: any = document.querySelector('head');
  initialHeadInnerHTML = head.innerHTML;

  document.head.innerHTML = '';
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test('applies expected metadata', async () => {
  render(<CollectionPageMeta collection={collection} />);

  await actWait(300);

  const title = document.title;
  const head = document.querySelector('head');
  const metaDescription = head.querySelector('[name="description"]');
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  const ogImage = head.querySelector('[property="og:image"]');
  // TODO: Test also image url when implemented

  expect(title).toEqual(title);
  expect(metaDescription).toHaveAttribute('content', socialMediaDescription);
  expect(ogTitle).toHaveAttribute('content', title);
  expect(ogDescription).toHaveAttribute('content', socialMediaDescription);
  expect(ogImage).toHaveAttribute('content', image);
});
