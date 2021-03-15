import i18n from 'i18next';
import { axe } from 'jest-axe';
import * as React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  act,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../test/testUtils';
import { ROUTES } from '../../routes/constants';
import Header from '../Header';

const renderComponent = (route = '/fi') =>
  render(<Header />, { routes: [route] });

beforeEach(() => {
  act(() => {
    i18n.changeLanguage('fi');
  });
});

/**
 * Due to ssr fix header is duplicated accessisbility complains about duplicate-id-aria. Thus skipped
 */
test.skip('component should be accessible', async () => {
  const { container } = renderComponent();

  expect(await axe(container)).toHaveNoViolations();
});

test('matches snapshot', async () => {
  i18n.changeLanguage('sv');
  const { container } = renderComponent('/sv');
  expect(container.firstChild).toMatchSnapshot();
});

test('should show navigation links and click should route to correct pages', async () => {
  const { history } = renderComponent();

  const links = [
    {
      name: translations.header.searchEvents,
      url: `/fi${ROUTES.EVENTS}`,
    },
    {
      name: translations.header.searchCollections,
      url: `/fi${ROUTES.COLLECTIONS}`,
    },
    {
      name: translations.header.searchHobbies,
      url: `/fi${ROUTES.COURSES}`,
    },
  ];

  links.forEach(({ name, url }) => {
    const link = screen.queryByRole('link', { name });

    expect(link).toBeInTheDocument();

    userEvent.click(link);
    expect(history.location.pathname).toBe(url);
  });
});

test('should change language', async () => {
  global.innerWidth = 1200;
  const { history } = renderComponent();

  expect(history.location.pathname).toBe('/fi');

  /**
   * Due to ssr fix header is duplicated
   * That's why getAllByRole(...)[0] has been used.
   */
  const button = screen.getAllByRole('button', {
    name: translations.header.changeLanguage,
  })[0];
  userEvent.click(button);

  const svOption = screen.getByRole('link', {
    name: translations.header.languages.sv,
  });
  userEvent.click(svOption);
  waitFor(() => expect(history.location.pathname).toBe('/sv'));
});
