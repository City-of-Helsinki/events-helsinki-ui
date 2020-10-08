import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../util/mockDataUtils';
import { render, screen } from '../../../../util/testUtils';
import LargeEventCard from '../LargeEventCard';

const getWrapper = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} />);

test('test for accessibility violations', async () => {
  const event = fakeEvent() as EventFieldsFragment;
  const { container } = getWrapper(event);

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

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

test('should go to event page by click Read more button', () => {
  const event = fakeEvent({
    id: '123',
  }) as EventFieldsFragment;

  const { history } = getWrapper(event);

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.getByRole('button', {
      name: translations.event.eventCard.ariaLabelReadMore.replace(
        '{{name}}',
        event.name.fi
      ),
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
      name: translations.event.eventCard.ariaLabelLink.replace(
        '{{name}}',
        event.name.fi
      ),
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});
