import userEvent from '@testing-library/user-event';
import { IconHome } from 'hds-react';
import React from 'react';

import { render, screen } from '../../../../test/testUtils';
import CategoryFilter from '../CategoryFilter';

const category = {
  text: 'text',
  value: 'value',
};

it('matches snapshot', () => {
  const { container } = render(
    <CategoryFilter
      href="/test"
      icon={<IconHome />}
      text={category.text}
      value={category.value}
    />
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClick callback when category filter button is clicked', () => {
  const testUrl = '/test';
  const { history } = render(
    <CategoryFilter
      href={testUrl}
      icon={<IconHome />}
      text={category.text}
      value={category.value}
    />
  );

  const historyPush = jest.spyOn(history, 'push');

  expect(screen.queryByText(category.text)).toBeInTheDocument();

  userEvent.click(screen.getByText(category.text));
  expect(historyPush).toHaveBeenCalledWith(testUrl);
});
