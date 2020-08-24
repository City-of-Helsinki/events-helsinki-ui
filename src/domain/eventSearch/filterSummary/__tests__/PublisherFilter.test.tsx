import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { OrganizationDetailsDocument } from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import mockOrganization from '../../../organisation/__mocks__/organizationDetails';
import PublisherFilter from '../PublisherFilter';

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

test('matches snapshot', async () => {
  const { container } = render(
    <PublisherFilter id={mockOrganization.id || ''} onRemove={jest.fn()} />,
    { mocks }
  );

  await screen.findByText(mockOrganization.name || '');
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked ', async () => {
  const onClickMock = jest.fn();
  render(
    <PublisherFilter id={mockOrganization.id || ''} onRemove={onClickMock} />,
    { mocks }
  );

  await screen.findByText(mockOrganization.name || '');

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(mockOrganization.id, 'publisher');
});
