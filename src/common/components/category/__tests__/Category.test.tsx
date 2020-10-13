import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Category from '../Category';

const category = { text: 'foo', value: 'bar' };

it('matches snapshot', () => {
  const { container } = render(
    <Category category={category} onRemove={jest.fn()} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked', () => {
  const onClickMock = jest.fn();
  render(<Category category={category} onRemove={onClickMock} />);

  expect(screen.queryByText(/foo/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
});
