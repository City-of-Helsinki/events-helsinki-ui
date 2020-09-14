import { advanceTo } from 'jest-date-mock';
import React from 'react';
import wait from 'waait';

import mockEvent from '../../__mocks__/eventDetails';
import { EventListDocument } from '../../../../generated/graphql';
import { fakeEvents } from '../../../../util/mockDataUtils';
import { act, render, screen } from '../../../../util/testUtils';
import SimilarEvents from '../SimilarEvents';

const variables = {
  combinedText: [],
  division: ['kunta:helsinki'],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: ['yso:1', 'yso:2'],
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: '2020-08-11T03',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};

const fakeEventsResponse = fakeEvents(3);

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables,
    },
    result: {
      data: {
        eventList: fakeEventsResponse,
      },
    },
  },
];

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  render(<SimilarEvents event={mockEvent} />, { mocks });

  await act(wait);

  fakeEventsResponse.data.forEach((event) => {
    expect(screen.getAllByText(event.name.fi as string)).toHaveLength(1);
  });
});
