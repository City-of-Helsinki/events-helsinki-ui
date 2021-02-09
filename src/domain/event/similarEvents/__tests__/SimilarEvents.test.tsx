import { MockedResponse } from '@apollo/react-testing';
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

const keywords = fakeKeywords(
  keywordIds.length,
  keywordIds.map((id) => ({ id, name: { fi: id } }))
).data;
const event = fakeEvent({
  keywords,
}) as EventFieldsFragment;
const expectedSimilarEvents = fakeEvents(3);

export const createMocks = (
  rootEvent: EventFieldsFragment = event,
  similarEvents = expectedSimilarEvents
): MockedResponse[] => [
  {
    request: {
      query: EventListDocument,
      variables: {
        audienceMinAgeGt: '',
        audienceMaxAgeLt: '',
        end: '',
        include: ['keywords', 'location'],
        isFree: undefined,
        keyword: rootEvent.keywords.map((keyword) => keyword.id),
        keywordAnd: [],
        keywordNot: [],
        language: 'fi',
        location: [],
        pageSize: 10,
        publisher: null,
        sort: 'end_time',
        start: 'now',
        startsAfter: undefined,
        superEventType: ['umbrella', 'none'],
      },
    },
    result: { data: { eventList: similarEvents } },
  },
];

const mocks = createMocks();

afterAll(() => {
  clear();
});

test('should render similar event cards', async () => {
  advanceTo(new Date('2020-08-11'));
  render(
    <SimilarEvents
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      events={expectedSimilarEvents.data as any}
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

  expectedSimilarEvents.data.forEach((event) => {
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
