import { MockedProvider } from '@apollo/react-testing';
import * as React from 'react';
import routeData, { MemoryRouter } from 'react-router';
import renderer from 'react-test-renderer';

import mockEvent from '../../__mocks__/eventDetails';
import { OrganizationDetailsDocument } from '../../../../generated/graphql';
import EventInfo from '../EventInfo';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockHistory: any = {
  push: () => {},
};
beforeEach(() => {
  jest.spyOn(routeData, 'useHistory').mockReturnValue(mockHistory);
});

const mocks = [
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: 'provider:123',
      },
    },
    result: {
      data: {
        organizationDetails: { id: '1', name: 'Test' },
      },
    },
  },
];

test('EventInfo matches snapshot', () => {
  const component = renderer.create(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <EventInfo event={mockEvent} />
      </MemoryRouter>
    </MockedProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

export {};
