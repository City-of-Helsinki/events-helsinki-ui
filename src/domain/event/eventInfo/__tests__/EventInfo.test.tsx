import { act } from '@testing-library/react';
import * as React from 'react';
import wait from 'waait';

import mockEvent from '../../__mocks__/eventDetails';
import { OrganizationDetailsDocument } from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import mockOrganization from '../../../organisation/__mocks__/organizationDetails';
import EventInfo from '../EventInfo';

const mocks = [
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: mockOrganization.id,
      },
    },
    result: {
      data: {
        organizationDetails: mockOrganization,
      },
    },
  },
];

test('EventInfo matches snapshot', async () => {
  const { container } = render(<EventInfo event={mockEvent} />, { mocks });

  await act(wait);
  expect(container.firstChild).toMatchSnapshot();
});
