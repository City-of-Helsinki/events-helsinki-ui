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
} from '../../../../util/testUtils';
import { ROUTES } from '../../constants';
import Header, { HeaderProps } from '../Header';

const defaultProps: HeaderProps = {
  menuOpen: false,
  onMenuToggle: jest.fn(),
};
const renderComponent = (props?: Partial<HeaderProps>, route = '/fi') =>
  render(<Header {...defaultProps} {...props} />, { routes: [route] });

beforeEach(() => {
  act(() => {
    i18n.changeLanguage('fi');
  });
});

test('component should be accessible', async () => {
  const { container } = renderComponent();

  expect(await axe(container)).toHaveNoViolations();
});

test('matches snapshot', async () => {
  i18n.changeLanguage('sv');
  const { container } = renderComponent(undefined, '/sv');
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
  ];

  links.forEach(({ name, url }) => {
    const link = screen.queryByRole('link', { name });

    expect(link).toBeInTheDocument();

    userEvent.click(link);
    expect(history.location.pathname).toBe(url);
  });
});

test('onMenuToggle function should be called', async () => {
  global.innerWidth = 500;
  const onMenuToggle = jest.fn();
  renderComponent({ onMenuToggle });

  const button = screen.getByRole('button', {
    name: translations.header.menuToggleAriaLabel,
  });

  userEvent.click(button);
  expect(onMenuToggle).toBeCalled();
});

test('should change language', async () => {
  global.innerWidth = 1200;
  const { history } = renderComponent();

  expect(history.location.pathname).toBe('/fi');

  const button = screen.getByRole('button', {
    name: translations.header.ariaButtonOpenMenu,
  });
  userEvent.click(button);

  const svOption = screen.getByRole('link', {
    name: translations.header.languages.sv,
  });
  userEvent.click(svOption);
  waitFor(() => expect(history.location.pathname).toBe('/sv'));
});
