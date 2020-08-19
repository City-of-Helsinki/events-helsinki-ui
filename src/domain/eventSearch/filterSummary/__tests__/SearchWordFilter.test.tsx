import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import SearchWordFilter from '../SearchWordFilter';

const props = {
  onRemove: jest.fn(),
  text: 'text',
};

it('matches snapshot', () => {
  const { container } = render(<SearchWordFilter {...props} />);

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onRemove callback when remove button is clicked ', () => {
  const onClickMock = jest.fn();
  render(<SearchWordFilter {...props} onRemove={onClickMock} />);

  expect(screen.queryByText(`‘${props.text}’`)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button'));

  expect(onClickMock).toHaveBeenCalled();
  expect(onClickMock).toHaveBeenCalledWith(props.text, 'searchWord');
});
