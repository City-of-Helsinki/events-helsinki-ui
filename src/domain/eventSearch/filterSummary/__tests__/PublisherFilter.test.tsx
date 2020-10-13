import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { OrganizationDetailsDocument } from '../../../../generated/graphql';
import { fakeOrganization } from '../../../../util/mockDataUtils';
import { render, waitFor } from '../../../../util/testUtils';
import PublisherFilter from '../PublisherFilter';

const id = '1';
const name = 'Organization name';
const organization = fakeOrganization({ id, name });
const organizationResponse = { data: { organizationDetails: organization } };

const request = {
  query: OrganizationDetailsDocument,
  variables: {
    id,
  },
};

const mocks = [
  {
    request,
    result: organizationResponse,
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <PublisherFilter id={id} onRemove={jest.fn()} />,
    { mocks }
  );

  await screen.findByText(name);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', async () => {
  const onClickMock = jest.fn();
  render(<PublisherFilter id={id} onRemove={onClickMock} />, { mocks });

  await screen.findByText(name);

  userEvent.click(
    screen.getByRole('button', {
      name: translations.commons.filter.ariaButtonRemove.replace(
        '{{filter}}',
        name
      ),
    })
  );

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(id, 'publisher');
});

it("should return null if place doesn't exist", async () => {
  const mocks = [
    {
      request,
      error: new Error('not found'),
    },
  ];

  const { container } = render(
    <PublisherFilter id={id} onRemove={jest.fn()} />,
    {
      mocks,
    }
  );

  await waitFor(() => {
    expect(
      screen.queryByText(translations.commons.loading)
    ).not.toBeInTheDocument();
  });

  expect(container.innerHTML).toBe('');
});
