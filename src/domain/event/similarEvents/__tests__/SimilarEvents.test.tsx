import { advanceTo } from 'jest-date-mock';
import React from 'react';
import wait from 'waait';

import {
  EventFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeEvents,
  fakeKeywords,
} from '../../../../util/mockDataUtils';
import { act, render, screen } from '../../../../util/testUtils';
import SimilarEvents from '../SimilarEvents';

const keywordIds = ['yso:1', 'yso:2'];

const variables = {
  combinedText: [],
  division: ['kunta:helsinki'],
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: keywordIds,
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

const event = fakeEvent({
  keywords: fakeKeywords(
    keywordIds.length,
    keywordIds.map((id) => ({ id }))
  ).data,
}) as EventFieldsFragment;
const events = fakeEvents(3);
const eventsResponse = { data: { eventList: events } };

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables,
    },
    result: eventsResponse,
  },
];

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  render(<SimilarEvents event={event} />, { mocks });

  await act(wait);

  events.data.forEach((event) => {
    expect(screen.queryByText(event.name.fi as string)).toBeDefined();
  });
});
