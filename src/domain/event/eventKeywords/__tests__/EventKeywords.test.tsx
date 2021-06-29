import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  OfferFieldsFragment,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeKeyword,
  fakeOffer,
} from '../../../../test/mockDataUtils';
import { render, screen, userEvent } from '../../../../test/testUtils';
import EventKeywords from '../EventKeywords';

const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) =>
  fakeKeyword({ name: { fi: name } })
);

const event = fakeEvent({
  keywords,
  startTime,
  endTime,
}) as EventFieldsFragment;

afterAll(() => {
  clear();
});

test('should render keywords and handle click', () => {
  const { history } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={true} />
  );

  keywordNames.forEach((keyword) => {
    expect(
      screen.queryByRole('link', { name: new RegExp(keyword, 'i') })
    ).toBeInTheDocument();
  });

  userEvent.click(
    screen.queryByRole('link', { name: new RegExp(keywordNames[0], 'i') })
  );

  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe(
    `?text=${encodeURIComponent(capitalize(keywordNames[0]))}`
  );
});

test('should not show keywords', () => {
  render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );

  keywordNames.forEach((keyword) => {
    expect(
      screen.queryByRole('link', { name: new RegExp(keyword, 'i') })
    ).not.toBeInTheDocument();
  });
});

test('should render today tag and handle click', () => {
  advanceTo('2020-06-22');
  const { history } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );

  userEvent.click(
    screen.queryByRole('link', {
      name: translations.event.categories.labelToday,
    })
  );
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?dateTypes=today');
});

test('should render this week tag and handle click', () => {
  advanceTo('2020-06-23');
  const { history } = render(
    <EventKeywords event={event} showIsFree={true} showKeywords={false} />
  );

  userEvent.click(
    screen.queryByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  );
  expect(history.location.pathname).toBe('/fi/events');
  expect(history.location.search).toBe('?dateTypes=this_week');
});

test('should hide buy button for free events', () => {
  const mockEvent = {
    ...event,
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  };
  render(
    <EventKeywords event={mockEvent} showIsFree={true} showKeywords={false} />
  );

  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelFree,
    })
  ).toBeInTheDocument();
});
