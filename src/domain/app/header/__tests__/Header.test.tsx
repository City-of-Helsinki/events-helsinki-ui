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

  const eventsUrl = `/fi${ROUTES.EVENTS}`;
  const eventLink = screen.queryByRole('link', {
    name: translations.header.searchEvents,
  });
  expect(eventLink).toBeInTheDocument();
  userEvent.click(eventLink);
  expect(history.location.pathname).toBe(eventsUrl);

  const collectionsUrl = `/fi${ROUTES.COLLECTIONS}`;
  const collectionsLink = screen.queryByRole('link', {
    name: translations.header.searchCollections,
  });
  expect(collectionsLink).toBeInTheDocument();
  userEvent.click(collectionsLink);
  expect(history.location.pathname).toBe(collectionsUrl);
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
    name: translations.header.changeLanguage,
  });
  userEvent.click(button);

  const svOption = screen.getByRole('link', {
    name: translations.header.languages.sv,
  });
  userEvent.click(svOption);
  waitFor(() => expect(history.location.pathname).toBe('/sv'));
});
