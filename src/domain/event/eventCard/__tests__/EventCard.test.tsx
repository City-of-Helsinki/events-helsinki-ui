import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { advanceTo, clear } from 'jest-date-mock';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent, fakeKeywords } from '../../../../util/mockDataUtils';
import { render, screen } from '../../../../util/testUtils';
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

const renderComponent = () => render(<EventCard event={event} />);

test('test for accessibility violations', async () => {
  const { container } = renderComponent();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('should go to event page by clicking event card', () => {
  advanceTo('2020-10-05');
  const { history } = renderComponent();

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.queryByRole('link', {
      name: translations.event.eventCard.ariaLabelLink.replace(
        '{{name}}',
        event.name.fi
      ),
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});

test('should go to event page by clicking button', () => {
  const { history } = renderComponent();

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.queryByRole('button', {
      name: translations.event.eventCard.ariaLabelLink.replace(
        '{{name}}',
        event.name.fi
      ),
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});
