import { act, render, screen } from '@testing-library/react';
import i18n from 'i18next';
import React from 'react';

import AboutPage from '../AboutPage';

it('should show about page in correct language', async () => {
  render(<AboutPage />);

  act(() => {
    i18n.changeLanguage('fi');
  });

  expect(screen.getAllByText('Tietoa palvelusta')).toHaveLength(1);

  act(() => {
    i18n.changeLanguage('en');
  });

  expect(screen.getAllByText('About the service')).toHaveLength(1);

  act(() => {
    i18n.changeLanguage('sv');
  });

  expect(screen.getAllByText('Om tjänsten')).toHaveLength(1);
});
