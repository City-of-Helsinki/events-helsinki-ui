import { render } from '@testing-library/react';
import React from 'react';

import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../util/mockDataUtils';
import { actWait } from '../../../../util/testUtils';
import EventPageMeta from '../EventPageMeta';

const eventName = 'Name of event';
const eventDescription = 'Description for event';
const eventImage = 'https://localhost/example/path';
const event = fakeEvent({
  images: [{ internalId: '', name: '', url: eventImage }],
  name: {
    fi: eventName,
  },
  shortDescription: {
    fi: eventDescription,
  },
}) as EventFieldsFragment;

// Rendering EventPageMeta creates a side effect--the document head will be
// mutated. This mutation will persist between tests. This can be problematic:
// (1) other test suites asserting against `document.head` may receive
//     unexpected initial conditions
// (2) this test suite may receive unexpected initial conditions if
//     `EventPageMeta` is rendered as part of some other test suite (likely)
// To combat these conditions, we are manually managing the `head` in setup and
// teardown.
let initialHeadInnerHTML = null;

beforeEach(() => {
  const head = document.querySelector('head');
  initialHeadInnerHTML = head.innerHTML;

  document.head.innerHTML = '';
});

afterEach(() => {
  document.head.innerHTML = initialHeadInnerHTML;
});

test('applies expected metadata', async () => {
  render(<EventPageMeta event={event} />);

  await actWait(300);

  const title = document.title;
  const head = document.querySelector('head');
  const metaDescription = head.querySelector('[name="description"]');
  const ogTitle = head.querySelector('[property="og:title"]');
  const ogDescription = head.querySelector('[property="og:description"]');
  const ogImage = head.querySelector('[property="og:image"]');

  expect(title).toEqual(eventName);
  expect(metaDescription).toHaveAttribute('content', eventDescription);
  expect(ogTitle).toHaveAttribute('content', eventName);
  expect(ogDescription).toHaveAttribute('content', eventDescription);
  expect(ogImage).toHaveAttribute('content', eventImage);
});
