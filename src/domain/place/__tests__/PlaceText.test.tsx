import { screen } from '@testing-library/react';
import * as React from 'react';

import mockPlace from '../__mocks__/place';
import { PlaceDetailsDocument } from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
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
  const { container } = render(<PlaceText id={mockPlace.id || ''} />, {
    mocks,
  });

  await screen.findByText((mockPlace.name || {})['fi'] || '');
  expect(container.firstChild).toMatchSnapshot();
});
