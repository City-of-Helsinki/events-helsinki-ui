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

let container: HTMLElement;

test('match snapshot', async () => {
  await act(async () => {
    const { container: el } = render(
      <CuratedEventList collection={mockCollection} />,
      { mocks }
    );
    container = el;
    await wait(0); // wait for response
  });

  expect(container.firstChild).toMatchSnapshot();
});
