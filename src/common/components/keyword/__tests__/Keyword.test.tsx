import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Keyword from '../Keyword';

const keyword = 'test keyword';

it('matches snapshot', () => {
  const { container } = render(
    <Keyword keyword={keyword} onClick={jest.fn()} />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClick callback when clicking', () => {
  const onClickMock = jest.fn();
  render(<Keyword keyword={keyword} onClick={onClickMock} />);

  expect(screen.queryByText(keyword)).toBeInTheDocument();

  userEvent.click(screen.getByRole('link'));

  expect(onClickMock).toHaveBeenCalled();
});
