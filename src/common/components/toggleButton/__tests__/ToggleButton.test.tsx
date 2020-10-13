import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import ToggleButton from '../ToggleButton';

const defaultProps = {
  isSelected: true,
  onClick: jest.fn(),
  text: 'Test button',
  value: 'test',
};

test('matches snapshot', () => {
  const { container } = render(<ToggleButton {...defaultProps} />);

  expect(container.firstChild).toMatchSnapshot();
});

test('should call onClick', () => {
  const onClick = jest.fn();
  const { container } = render(
    <ToggleButton {...defaultProps} onClick={onClick} />
  );

  userEvent.click(container.firstChild as HTMLElement);
  expect(onClick).toBeCalledTimes(1);
});
