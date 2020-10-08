import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../../common/translation/i18n/fi.json';
import { render, screen, userEvent } from '../../../../../util/testUtils';
import Navbar from '../Navbar';

const getWrapper = () => render(<Navbar />, { routes: ['/fi/home'] });

it('component should be accessible', async () => {
  const { container } = getWrapper();

  expect(await axe(container)).toHaveNoViolations();
});

test('should change language', async () => {
  const languageLabel = translations.header.languages.sv;

  const { history } = getWrapper();

  const button = screen.getByRole('button', {
    name: translations.header.changeLanguage,
  });

  userEvent.click(button);

  userEvent.click(
    screen.getByRole('button', {
      name: languageLabel,
    })
  );

  expect(history.location.pathname).toBe('/sv/home');
  expect(
    screen.queryByRole('link', { name: translations.header.ariaLabelLogo })
      .firstChild
  ).toHaveClass('sv');
});
