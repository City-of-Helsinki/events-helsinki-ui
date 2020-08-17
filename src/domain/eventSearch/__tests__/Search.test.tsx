import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import React from 'react';
import { MemoryRouter } from 'react-router';

import {
  NeighborhoodListDocument,
  PlaceListDocument,
} from '../../../generated/graphql';
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
  const { container } = render(
    <MemoryRouter>
      <MockedProvider mocks={mocks}>
        <Search scrollToResultList={jest.fn()} />
      </MockedProvider>
    </MemoryRouter>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
