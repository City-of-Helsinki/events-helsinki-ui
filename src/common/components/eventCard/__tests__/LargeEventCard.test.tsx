import userEvent from '@testing-library/user-event';
import React from 'react';

import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../util/mockDataUtils';
import { render, screen } from '../../../../util/testUtils';
import translations from '../../../translation/i18n/fi.json';
import LargeEventCard from '../LargeEventCard';

const getWrapper = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} />);

test('should show buy button when event has an offer', () => {
  global.open = jest.fn();
  const event = fakeEvent({
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
      },
    ],
  }) as EventFieldsFragment;
  getWrapper(event);

  const button = screen.queryByRole('button', {
    name: /osta liput - linkki avautuu uudessa ikkunassa/i,
  });

  expect(button).toBeInTheDocument();

  userEvent.click(button);
  expect(global.open).toBeCalledWith('https://example.domain');
});

test('should hide buy button when event is free', () => {
  const event = fakeEvent({
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
        isFree: true,
      },
    ],
  }) as EventFieldsFragment;
  getWrapper(event);

  expect(
    screen.queryByRole('button', {
      name: /osta liput - linkki avautuu uudessa ikkunassa/i,
    })
  ).not.toBeInTheDocument();
});

test('should hide buy button when event is closed', () => {
  const event = fakeEvent({
    endTime: '2017-01-01',
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
      },
    ],
    startTime: '2017-01-01',
  }) as EventFieldsFragment;

  getWrapper(event);

  expect(
    screen.queryByRole('button', {
      name: /osta liput - linkki avautuu uudessa ikkunassa/i,
    })
  ).not.toBeInTheDocument();
});

test('should go to event page', () => {
  const event = fakeEvent({
    id: '123',
  }) as EventFieldsFragment;

  const { history } = getWrapper(event);

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.event.buttonReadMore,
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});

test('should go to event page by clicking event card', () => {
  const event = fakeEvent({
    id: '123',
  }) as EventFieldsFragment;

  const { history } = getWrapper(event);

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
