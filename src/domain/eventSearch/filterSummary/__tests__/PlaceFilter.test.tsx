import { MockedProvider } from '@apollo/react-testing';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { PlaceDetailsDocument } from '../../../../generated/graphql';
import mockPlace from '../../../place/__mocks__/place';
import PlaceFilter from '../PlaceFilter';

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
      <PlaceFilter id={mockPlace.id || ''} onRemove={jest.fn()} />
    </MockedProvider>
  );

  await screen.findByText((mockPlace.name || {})['fi'] || '');
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked ', async () => {
  const onClickMock = jest.fn();
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <PlaceFilter id={mockPlace.id || ''} onRemove={onClickMock} />
    </MockedProvider>
  );

  await screen.findByText((mockPlace.name || {})['fi'] || '');

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
});
