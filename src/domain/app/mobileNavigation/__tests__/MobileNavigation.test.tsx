import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';

import {
  mobileMenuDataId,
  MobileMenuProvider,
} from '../../../../common/components/mobileMenu/MobileMenu';
import translations from '../../../../common/translation/i18n/fi.json';
import MobileNavigation from '../MobileNavigation';

it('matches snapshot', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={[`/fi/home`]}>
      <MobileNavigation />
    </MemoryRouter>
  );

  expect(container.firstChild).toMatchSnapshot();
});

it('menu should be opened and closed by menu button', async () => {
  render(
    <MemoryRouter initialEntries={[`/fi/home`]}>
      <MobileMenuProvider>
        <MobileNavigation />
      </MobileMenuProvider>
    </MemoryRouter>
  );

  userEvent.click(
    screen.getByRole('button', {
      name: translations.header.ariaButtonOpenMenu,
    })
  );

  expect(screen.getByTestId(mobileMenuDataId)).toHaveClass('menuOpen');

  userEvent.click(
    screen.getByRole('button', {
      name: translations.header.ariaButtonCloseMenu,
    })
  );

  expect(screen.getByTestId(mobileMenuDataId)).not.toHaveClass('menuOpen');
});
