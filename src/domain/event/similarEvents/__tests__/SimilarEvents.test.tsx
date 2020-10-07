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
const keywords = fakeKeywords(
  keywordIds.length,
  keywordIds.map((id) => ({ id, name: { fi: id } }))
).data;
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
  render(<SimilarEvents event={event} />, { mocks });

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
        name: translations.commons.eventCard.ariaLabelLink.replace(
          '{{name}}',
          event.name.fi
        ),
      })
    ).toBeInTheDocument();
  });
});
