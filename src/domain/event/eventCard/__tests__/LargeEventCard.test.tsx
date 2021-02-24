import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { EventFieldsFragment } from '../../../../generated/graphql';
import { fakeEvent } from '../../../../util/mockDataUtils';
import { render, renderWithRoute, screen } from '../../../../util/testUtils';
import { ROUTES } from '../../../app/routes/constants';
import { MAPPED_PLACES } from '../../../eventSearch/constants';
import LargeEventCard from '../LargeEventCard';

const renderComponent = (event: EventFieldsFragment) =>
  render(<LargeEventCard event={event} />);

test('test for accessibility violations', async () => {
  const event = fakeEvent() as EventFieldsFragment;
  const { container } = renderComponent(event);

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
  renderComponent(event);

  const button = screen.getByRole('button', {
    name: /osta liput - linkki avautuu uudessa ikkunassa/i,
  });

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
  renderComponent(event);

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

  renderComponent(event);

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

  const { history } = renderComponent(event);

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

  const { history } = renderComponent(event);

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

describe('test all event places for modified query string', () => {
  Object.keys(MAPPED_PLACES).forEach((place) => {
    it(`clicking event link and button works correctly if path is /${place}`, () => {
      const event = fakeEvent() as EventFieldsFragment;
      const { history } = renderWithRoute(<LargeEventCard event={event} />, {
        routes: [`/fi/${place}`],
        path: `/fi${ROUTES.EVENT_PLACE}`,
      });

      const push = jest.spyOn(history, 'push');

      userEvent.click(
        screen.queryByRole('link', {
          name: translations.event.eventCard.ariaLabelLink.replace(
            '{{name}}',
            event.name.fi
          ),
        })
      );

      // goBack to have the event card rendered (path need to match after url has changed)
      history.goBack();

      userEvent.click(
        screen.getByRole('button', {
          name: translations.event.eventCard.ariaLabelReadMore.replace(
            '{{name}}',
            event.name.fi
          ),
        })
      );

      expect(push.mock.calls).toEqual([
        [`/fi/event/${event.id}?returnPath=${encodeURIComponent('/' + place)}`],
        [`/fi/event/${event.id}?returnPath=${encodeURIComponent('/' + place)}`],
      ]);
    });
  });
});
