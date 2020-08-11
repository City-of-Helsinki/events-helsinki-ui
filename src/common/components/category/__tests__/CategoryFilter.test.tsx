import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconHome } from 'hds-react';
import React from 'react';

import CategoryFilter from '../CategoryFilter';

const category = {
  text: 'text',
  value: 'value',
};

it('matches snapshot', () => {
  const { container } = render(
    <CategoryFilter
      icon={<IconHome />}
      onClick={jest.fn()}
      text={category.text}
      value={category.value}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClick callback when catetgory filter button is clicked ', () => {
  const onClickMock = jest.fn();
  render(
    <CategoryFilter
      icon={<IconHome />}
      onClick={onClickMock}
      text={category.text}
      value={category.value}
    />
  );

  expect(screen.queryByText(category.text)).toBeInTheDocument();

  userEvent.click(screen.getByText(category.text));

  expect(onClickMock).toHaveBeenCalled();
});
