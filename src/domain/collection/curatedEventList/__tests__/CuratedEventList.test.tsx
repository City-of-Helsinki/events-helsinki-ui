import { act } from '@testing-library/react';
import React from 'react';
import wait from 'waait';

import mockCollection from '../../__mocks__/collection';
import { EventsByIdsDocument } from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import mockEvent from '../../../event/__mocks__/eventDetails';
import { getEventIdFromUrl } from '../../../event/EventUtils';
import CuratedEventList from '../CuratedEventList';

const mocks = [
  {
    request: {
      query: EventsByIdsDocument,
      variables: {
        ids: mockCollection.curatedEvents
          .map(url => getEventIdFromUrl(url) || '')
          .filter(e => e),
        include: ['keywords', 'location'],
      },
    },
    result: {
      data: { eventsByIds: [mockEvent] },
    },
  },
];

test('match snapshot', async () => {
  const { container } = render(
    <CuratedEventList collection={mockCollection} />,
    { mocks }
  );

  await act(wait);
  expect(container.firstChild).toMatchSnapshot();
});
