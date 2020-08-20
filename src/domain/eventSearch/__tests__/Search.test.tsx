import { act } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import wait from 'waait';

import {
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
import neighborhoodListResponse from '../../neighborhood/__mocks__/neighborhoodListResponse';
import placeListResponse from '../../place/__mocks__/placeListResponse';
import Search from '../Search';

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodListResponse,
  },
  {
    request: {
      query: PlaceListDocument,
      variables: {
        hasUpcomingEvents: true,
        pageSize: 10,
        text: '',
      },
    },
    result: placeListResponse,
  },
];

test('test for accessibility violations', async () => {
  const { container } = render(<Search scrollToResultList={jest.fn()} />, {
    mocks,
  });

  await act(async () => {
    await wait(500);
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
