import { advanceTo, clear } from 'jest-date-mock';
import capitalize from 'lodash/capitalize';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventDetails,
  EventFieldsFragment,
  OfferFieldsFragment,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeExternalLink,
  fakeKeyword,
  fakeLocalizedObject,
  fakeOffer,
} from '../../../../test/mockDataUtils';
import { render, screen, userEvent } from '../../../../test/testUtils';
import getDateRangeStr from '../../../../util/getDateRangeStr';
import EventHero, { Props as EventHeroProps } from '../EventHero';

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

const getFakeEvent = (overrides?: Partial<EventDetails>) => {
  return fakeEvent({
    name: { fi: name },
    keywords,
    startTime,
    endTime,
    publisher: '',
    shortDescription: { fi: shortDescription },
    location: {
      internalId: 'tprek:8740',
      addressLocality: { fi: addressLocality },
      name: { fi: locationName },
      streetAddress: { fi: streetAddress },
    },
    externalLinks: null,
    ...overrides,
  }) as EventFieldsFragment;
};

afterAll(() => {
  clear();
});

const renderComponent = (props?: Partial<EventHeroProps>) => {
  return render(<EventHero event={getFakeEvent()} {...props} />);
};

test('should render event name, description and location', () => {
  renderComponent();

  expect(screen.queryByRole('heading', { name })).toBeInTheDocument();
  expect(screen.queryByText(shortDescription)).toBeInTheDocument();
  expect(
    screen.queryByText(
      [locationName, streetAddress, addressLocality].join(', ')
    )
  ).toBeInTheDocument();
});

test('should go to event list', () => {
  const { history } = renderComponent();

  userEvent.click(
    screen.getByRole('link', {
      name: translations.event.hero.ariaLabelBackButton,
    })
  );
  expect(history.location.pathname).toBe('/fi/events');
});

test('should render keywords', () => {
  renderComponent();

  keywordNames.forEach((keyword) => {
    expect(screen.queryByText(capitalize(keyword))).toBeInTheDocument();
  });
});

test('should render today tag', () => {
  advanceTo('2020-06-22');
  renderComponent();

  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelToday,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  ).not.toBeInTheDocument();
});

test('should render this week tag', () => {
  advanceTo('2020-06-23');
  renderComponent();

  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelToday,
    })
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole('link', {
      name: translations.event.categories.labelThisWeek,
    })
  ).toBeInTheDocument();
});

test('should hide buy button for free events', () => {
  const mockEvent = getFakeEvent({
    offers: [fakeOffer({ isFree: true }) as OfferFieldsFragment],
  });
  render(<EventHero event={mockEvent} />);

  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonBuyTickets, 'i'),
    })
  ).not.toBeInTheDocument();
});

test('should show buy button', () => {
  global.open = jest.fn();
  const infoUrl = 'https://test.url';
  const mockEvent = getFakeEvent({
    offers: [
      fakeOffer({
        isFree: false,
        infoUrl: fakeLocalizedObject(infoUrl),
      }) as OfferFieldsFragment,
    ],
    externalLinks: null,
  });

  render(<EventHero event={mockEvent} />);

  // shouldn't be rendred when externalLinks are not present
  expect(
    screen.queryByRole('button', {
      name: new RegExp(translations.event.hero.buttonEnrol, 'i'),
    })
  ).not.toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: new RegExp(translations.event.hero.buttonBuyTickets, 'i'),
    })
  );
  expect(global.open).toHaveBeenCalledWith(infoUrl);
});

test('Register button should be visible and clickable', () => {
  global.open = jest.fn();
  const registrationUrl = 'https://harrastushaku.fi/register/13290';
  const mockEvent = getFakeEvent({
    externalLinks: [
      fakeExternalLink({
        link: registrationUrl,
        name: 'registration',
      }),
    ],
  });

  render(<EventHero event={mockEvent} />);

  expect(
    screen.queryByText(translations.event.hero.buttonEnrol)
  ).toBeInTheDocument();

  userEvent.click(
    screen.getByRole('button', {
      name: translations.event.hero.ariaLabelEnrol,
    })
  );

  expect(global.open).toBeCalledWith(registrationUrl);
});

test('should show event dates if super event is defined', () => {
  const mockEvent = getFakeEvent();
  const mockSuperEvent = getFakeEvent({
    startTime: '2020-06-22T07:00:00.000000Z',
    endTime: '2025-06-26T07:00:00.000000Z',
  });
  render(
    <EventHero
      event={mockEvent}
      superEvent={{ data: mockSuperEvent, status: 'resolved' }}
    />
  );

  const dateStr = getDateRangeStr({
    start: mockEvent.startTime,
    end: mockEvent.endTime,
    locale: 'fi',
    includeTime: true,
    timeAbbreviation: translations.commons.timeAbbreviation,
  });

  expect(screen.getByText(dateStr)).toBeInTheDocument();
});
