import * as React from 'react';

import {
  LinkedEventsSource,
  PlaceDetailsDocument,
} from '../../../generated/graphql';
import { fakePlace } from '../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../util/testUtils';
import PlaceText from '../PlaceText';

const placeId = 'helsinki:123';
const name = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: name } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
        source: LinkedEventsSource.Linkedevents,
      },
    },
    result: placeResponse,
  },
];

test('matches snapshot', async () => {
  const { container } = render(<PlaceText id={placeId} />, {
    mocks,
  });

  await waitFor(() => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});
