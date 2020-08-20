import { act } from '@testing-library/react';
import { advanceTo } from 'jest-date-mock';
import React from 'react';
import wait from 'waait';

import { NeighborhoodListDocument } from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import LandingPageSearch from '../LandingPageSearch';

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: {
      data: {
        neighborhoodList: {
          data: [],
          meta: { count: 0, next: null, previous: null },
        },
      },
    },
  },
];

test('LandingPageSearch should match snapshot', async () => {
  advanceTo(new Date('2020-08-20'));
  const { container } = render(<LandingPageSearch />, { mocks });

  await act(wait); // wait for response

  expect(container.firstChild).toMatchSnapshot();
});
