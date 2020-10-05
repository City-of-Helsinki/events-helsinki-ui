import React from 'react';

import { PlaceDetailsDocument } from '../../../../generated/graphql';
import { fakePlace } from '../../../../util/mockDataUtils';
import { render, screen, userEvent } from '../../../../util/testUtils';
import PlaceFilter from '../PlaceFilter';

const placeId = 'helsinki:123';
const placeName = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: placeName } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

test('matches snapshot', async () => {
  const { container } = render(
    <PlaceFilter id={placeId} onRemove={jest.fn()} />,
    { mocks }
  );

  await screen.findByText(placeName);
  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked ', async () => {
  const onClickMock = jest.fn();
  render(<PlaceFilter id={placeId} onRemove={onClickMock} />, {
    mocks,
  });

  await screen.findByText(placeName);

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(placeId, 'place');
});
