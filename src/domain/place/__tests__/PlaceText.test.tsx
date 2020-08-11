import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

import mockPlace from '../__mocks__/place';
import { PlaceDetailsDocument } from '../../../generated/graphql';
import PlaceText from '../PlaceText';

const mocks = [
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: mockPlace.id,
      },
    },
    result: {
      data: {
        placeDetails: mockPlace,
      },
    },
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <PlaceText id={mockPlace.id || ''} />
    </MockedProvider>
  );

  await screen.findByText((mockPlace.name || {})['fi'] || '');
  expect(container.firstChild).toMatchSnapshot();
});
