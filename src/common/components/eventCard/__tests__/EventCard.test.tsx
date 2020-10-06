import userEvent from '@testing-library/user-event';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent, fakeKeywords } from '../../../../util/mockDataUtils';
import { render, screen } from '../../../../util/testUtils';
import translations from '../../../translation/i18n/fi.json';
import EventCard from '../EventCard';

const keywordNames = ['Keyword 1', 'Keyword 2'];
const keywords = fakeKeywords(
  keywordNames.length,
  keywordNames.map((keyword) => ({ name: { fi: keyword } }))
);
const id = '123';
const name = 'Keyword name';
const startTime = '2020-10-05T07:00:00.000000Z';
const endTime = '2020-10-15T10:00:00.000000Z';
const addressLocality = 'Helsinki';
const locationName = 'Location name';
const streetAddress = 'Test address 1';
const event = fakeEvent({
  id,
  startTime,
  endTime,
  keywords: keywords.data,
  name: { fi: name },
  location: {
    internalId: 'tprek:8740',
    addressLocality: { fi: addressLocality },
    name: { fi: locationName },
    streetAddress: { fi: streetAddress },
  },
}) as EventFieldsFragment;

afterAll(() => {
  clear();
});

test('metches snapshot', () => {
  const { container } = render(<EventCard event={event} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should go to event page by clicking event card', () => {
  advanceTo('2020-10-05');
  const { history } = render(<EventCard event={event} />);

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.queryByRole('link', {
      name: translations.commons.eventCard.ariaLabelLink.replace(
        '{{name}}',
        event.name.fi
      ),
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});

test('should go to event page by clicking button', () => {
  const { history } = render(<EventCard event={event} />);

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.queryByRole('button', {
      name: translations.commons.eventCard.ariaLabelLink.replace(
        '{{name}}',
        event.name.fi
      ),
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});
