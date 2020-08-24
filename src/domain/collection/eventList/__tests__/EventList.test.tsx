import { act } from '@testing-library/react';
import React from 'react';
import wait from 'waait';

import mockCollection from '../../__mocks__/collection';
import { SUPPORT_LANGUAGES } from '../../../../constants';
import { EventListDocument } from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import mockEvent from '../../../event/__mocks__/eventDetails';
import { EVENT_SORT_OPTIONS, PAGE_SIZE } from '../../../eventSearch/constants';
import { getEventSearchVariables } from '../../../eventSearch/utils';
import EventList from '../EventList';

const searchParams = new URLSearchParams(
  new URL((mockCollection.eventListQuery || {})['fi'] || '').search
);

const mocks = [
  {
    request: {
      query: EventListDocument,
      variables: getEventSearchVariables({
        include: ['keywords', 'location'],
        language: SUPPORT_LANGUAGES.FI,
        pageSize: PAGE_SIZE,
        params: searchParams,
        sortOrder: EVENT_SORT_OPTIONS.END_TIME,
        superEventType: ['umbrella', 'none'],
      }),
    },
    result: {
      data: {
        eventList: {
          __typename: 'EventListResponse',
          data: [mockEvent],
          meta: {
            __typename: 'Meta',
            count: 1,
            next: null,
            previous: null,
          },
        },
      },
    },
  },
];

test('EventList should match snapshot', async () => {
  const { container } = render(<EventList collection={mockCollection} />, {
    mocks,
  });

  await act(wait);
  expect(container.firstChild).toMatchSnapshot();
});
