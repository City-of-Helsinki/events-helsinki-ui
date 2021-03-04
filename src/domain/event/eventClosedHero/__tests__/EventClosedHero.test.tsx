import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import { render, screen, userEvent } from '../../../../test/testUtils';
import EventClosedHero from '../EventClosedHero';

it('should render all text fields', () => {
  render(<EventClosedHero />);

  expect(
    screen.queryByRole('heading', {
      name: translations.event.hero.titleEventClosed,
    })
  ).toBeInTheDocument();
  expect(
    screen.queryByText(translations.event.hero.textEventClosed)
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', {
      name: translations.event.hero.buttonToHomePage,
    })
  ).toBeInTheDocument();
});

it('should go to home page when clicking button', () => {
  const { history } = render(<EventClosedHero />);

  userEvent.click(
    screen.getByRole('button', {
      name: translations.event.hero.buttonToHomePage,
    })
  );
  expect(history.location.pathname).toBe('/fi/home');
});
