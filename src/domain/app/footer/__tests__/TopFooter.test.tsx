import i18n from 'i18next';
import { axe } from 'jest-axe';
import React from 'react';

import { render, screen, userEvent } from '../../../../test/testUtils';
import TopFooter, { testIds } from '../TopFooter';

beforeEach(() => {
  i18n.changeLanguage('fi');
});

test('component should be accessible', async () => {
  const { container } = render(<TopFooter />);

  expect(await axe(container)).toHaveNoViolations();
});

test('should route to event search page by clicking category ', () => {
  const { history } = render(<TopFooter />);

  userEvent.click(screen.getByRole('button', { name: /elokuva/i }));

  expect(history.location.pathname).toMatchSnapshot();
});

test('should show Swedish logo ', () => {
  i18n.changeLanguage('sv');
  render(<TopFooter />);

  userEvent.click(screen.getByRole('button', { name: /elokuva/i }));

  expect(screen.queryByTestId(testIds.logo)).toHaveClass('sv');
});
