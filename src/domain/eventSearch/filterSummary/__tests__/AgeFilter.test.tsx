import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import AgeFilter, { AgeFilterProps } from '../AgeFilter';

const props: AgeFilterProps = {
  onRemove: jest.fn(),
  value: '10',
  type: 'minAge',
};

it('matches snapshot', () => {
  const { container } = render(<AgeFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', () => {
  const onClickMock = jest.fn();
  render(<AgeFilter {...props} onRemove={onClickMock} />);

  expect(screen.queryByText(`Ikä alkaen ${props.value} v`)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.value, 'minAge');
});
