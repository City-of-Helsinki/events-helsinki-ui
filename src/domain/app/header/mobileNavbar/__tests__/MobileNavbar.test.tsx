import i18n from 'i18next';
import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../../common/translation/i18n/fi.json';
import { render, screen } from '../../../../../util/testUtils';
import MobileNavbar from '../MobileNavbar';

beforeEach(() => {
  i18n.changeLanguage('fi');
});

const getWrapper = () =>
  render(<MobileNavbar isMenuOpen={true} onToggleMenu={jest.fn()} />);

it('component should be accessible', async () => {
  const { container } = getWrapper();
  expect(await axe(container)).toHaveNoViolations();
});

it('should show Swedish icon', () => {
  i18n.changeLanguage('sv');
  const { container } = render(
    <MobileNavbar isMenuOpen={true} onToggleMenu={jest.fn()} />
  );

  expect(container.firstChild).toMatchSnapshot();
  expect(
    screen.queryByRole('link', { name: translations.header.ariaLabelLogo })
      .firstChild
  ).toHaveClass('sv');
});
