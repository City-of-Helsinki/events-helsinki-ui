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
} from '../../../../util/mockDataUtils';
import { render, screen, userEvent } from '../../../../util/testUtils';
import EventHero from '../EventHero';

const name = 'Event name';
const startTime = '2020-06-22T07:00:00.000000Z';
const endTime = '2020-06-22T10:00:00.000000Z';
const shortDescription = 'Event description';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const addressLocality = 'Helsinki';

const keywordNames = ['keyword 1', 'keyword 2'];
const keywords = keywordNames.map((name) =>
  fakeKeyword({ name: { fi: name } })
);

const event = fakeEvent({
  name: { fi: name },
  keywords,
  startTime,
  endTime,
  shortDescription: { fi: shortDescription },
  location: {
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
    publisher: '',
  },
}) as EventFieldsFragment;

afterAll(() => {
  clear();
});

test('should render event name, description and location', () => {
  render(<EventHero event={event} />);

  expect(screen.queryByRole('heading', { name })).toBeInTheDocument();
  expect(screen.queryByText(shortDescription)).toBeInTheDocument();
  expect(
    screen.queryByText(
      [locationName, streetAddress, addressLocality].join(', ')
    )
  ).toBeInTheDocument();
});

test('should go to event list', () => {
  const { history } = render(<EventHero event={event} />);

  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.hero.ariaLabelBackButton,
    })
  );
  expect(history.location.pathname).toBe('/fi/events');
});

test('should render keywords', () => {
  render(<EventHero event={event} />);

  keywordNames.forEach((keyword) => {
    expect(screen.queryByText(capitalize(keyword))).toBeInTheDocument();
  });
});

test('should render today tag', () => {
  advanceTo('2020-06-22');
  render(<EventHero event={event} />);

  expect(
    screen.queryByRole('button', {
      name: translations.event.categories.labelToday,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.event.categories.labelThisWeek,
    })
  ).not.toBeInTheDocument();
});

test('should render this week tag', () => {
  advanceTo('2020-06-23');
  render(<EventHero event={event} />);

  expect(
    screen.queryByRole('button', {
      name: translations.event.categories.labelToday,
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', {
      name: translations.event.categories.labelThisWeek,
    })
  ).toBeInTheDocument();
});

test('should hide buy button for free events', () => {
  const mockEvent = {
    ...event,
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  };
  render(<EventHero event={mockEvent} />);

  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonBuyTickets, 'i'),
    })
  ).not.toBeInTheDocument();
});

test('should show buy button', () => {
  global.open = jest.fn();
  const mockEvent = {
    ...event,
    offers: [fakeOffer({ isFree: false }) as OfferFieldsFragment],
  };

  render(<EventHero event={mockEvent} />);

  userEvent.click(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonBuyTickets, 'i'),
    })
  );
  expect(global.open).toBeCalledTimes(1);
});
