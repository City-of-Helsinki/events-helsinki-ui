import { clear } from 'console';
import { advanceTo } from 'jest-date-mock';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  EventFieldsFragment,
  EventListDocument,
} from '../../../../generated/graphql';
import {
  fakeEvent,
  fakeEvents,
  fakeKeywords,
} from '../../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../../util/testUtils';
import SimilarEvents from '../SimilarEvents';

const keywordIds = ['yso:1', 'yso:2'];

const variables = {
  end: '',
  include: ['keywords', 'location'],
  isFree: undefined,
  keyword: keywordIds,
  keywordAnd: [],
  keywordNot: [],
  language: 'fi',
  location: [],
  localOngoingOrSet1: [],
  pageSize: 10,
  publisher: null,
  sort: 'end_time',
  start: 'now',
  startsAfter: undefined,
  superEventType: ['umbrella', 'none'],
};
const keywords = fakeKeywords(
  keywordIds.length,
  keywordIds.map((id) => ({ id, name: { fi: id } }))
).data;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const event = fakeEvent({
  keywords,
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

afterAll(() => {
  clear();
});

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  render(
    <SimilarEvents
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      events={events.data as any}
      eventsType="event"
      loading={false}
    />,
    { mocks }
  );

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', {
        name: translations.event.similarEvents.title,
      })
    ).toBeInTheDocument();
  });

  events.data.forEach((event) => {
    expect(
      screen.queryByRole('link', {
        name: translations.event.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi
        ),
      })
    ).toBeInTheDocument();
  });
});
