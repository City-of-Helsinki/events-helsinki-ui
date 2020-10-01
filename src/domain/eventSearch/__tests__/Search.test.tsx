import { act } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import wait from 'waait';

import {
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
import { fakeNeighborhoods, fakePlaces } from '../../../util/mockDataUtils';
import Search from '../Search';

const neighborhoodsResponse = {
  data: { neighborhoodList: fakeNeighborhoods(10) },
};
const placesResponse = { data: { placeList: fakePlaces(10) } };

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
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
    result: placesResponse,
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
