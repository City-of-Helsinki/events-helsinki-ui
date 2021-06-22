import i18n from 'i18next';
import { axe } from 'jest-axe';
import React from 'react';

import { render, screen, userEvent } from '../../../../test/testUtils';
import { ROUTES } from '../../routes/constants';
import FooterCategories from '../FooterCategories';

beforeEach(() => {
  i18n.changeLanguage('fi');
});

test('component should be accessible', async () => {
  const { container } = render(<FooterCategories route={ROUTES.EVENTS} />);

  expect(await axe(container)).toHaveNoViolations();
});

test('should route to event search page by clicking category', () => {
  const { history } = render(<FooterCategories route={ROUTES.EVENTS} />);

  userEvent.click(screen.getByRole('link', { name: /elokuva/i }));

  expect(history.location.pathname).toMatchSnapshot();
});

//  TODO: It seems that hds Footer does not support logoLanguage yet
test.skip('should show Swedish logo', () => {
  i18n.changeLanguage('sv');
  render(<FooterCategories route={ROUTES.EVENTS} />);

  userEvent.click(screen.getByRole('button', { name: /elokuva/i }));

  expect(screen.queryByRole('img')).toHaveClass('sv');
});
