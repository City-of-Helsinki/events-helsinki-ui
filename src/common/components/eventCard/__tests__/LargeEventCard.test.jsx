import userEvent from '@testing-library/user-event';
import React from 'react';

import { render, screen } from '../../../../util/testUtils';
import translations from '../../../translation/i18n/fi.json';
import LargeEventCard from '../LargeEventCard';

const getWrapper = (props) => render(<LargeEventCard {...props} />);

test('should show buy button when event has an offer', () => {
  const mockEvent = {
    id: '123',
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
      },
    ],
  };
  const { queryByText } = getWrapper({ event: mockEvent });

  expect(queryByText('Osta liput')).not.toEqual(null);
});

test('should hide buy button when event is free', () => {
  const mockEvent = {
    id: '123',
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
        isFree: true,
      },
    ],
  };
  const { queryByText } = getWrapper({ event: mockEvent });

  expect(queryByText('Osta liput')).toEqual(null);
});

test('should hide buy button when event is closed', () => {
  const mockEvent = {
    endTime: '2017-01-01',
    id: '123',
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
      },
    ],
    startTime: '2017-01-01',
  };
  const { queryByText } = getWrapper({ event: mockEvent });

  expect(queryByText('Osta liput')).toEqual(null);
});

test('should go to event page', () => {
  const mockEvent = {
    endTime: '2017-01-01',
    id: '123',
    images: [],
    keywords: [],
    name: {},
    offers: [
      {
        infoUrl: {
          fi: 'https://example.domain',
        },
      },
    ],
    startTime: '2017-01-01',
  };
  const { history } = getWrapper({ event: mockEvent });

  expect(history.location.pathname).toEqual('/');

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.event.buttonReadMore,
    })
  );

  expect(history.location.pathname).toEqual('/fi/event/123');
});