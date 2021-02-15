import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { act, fireEvent, render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import wait from 'waait';

type CustomRender = {
  (
    ui: React.ReactElement,
    options?: {
      routes?: string[];
      path?: string;
      history?: History;
      mocks?: MockedResponse[];
    }
  ): CustomRenderResult;
};

export type CustomRenderResult = RenderResult & { history: History };

export const arrowUpKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 38, key: 'ArrowUp' });

export const arrowDownKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 40, key: 'ArrowDown' });

export const enterKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 13, key: 'Enter' });

export const escKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 27, key: 'Escape' });

export const tabKeyPressHelper = (): boolean =>
  fireEvent.keyDown(document, { code: 9, key: 'Tab' });

const customRender: CustomRender = (
  ui,
  {
    routes = ['/'],
    history = createMemoryHistory({ initialEntries: routes }),
    mocks = [],
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <MockedProvider mocks={mocks}>
      <Router history={history}>{children}</Router>
    </MockedProvider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, history };
};

const renderWithRoute: CustomRender = (
  ui,
  {
    routes = ['/'],
    path = '/',
    history = createMemoryHistory({ initialEntries: routes }),
    mocks = [],
  } = {}
) => {
  const Wrapper: React.FC = ({ children }) => (
    <MockedProvider mocks={mocks}>
      <Router history={history}>
        <Route exact path={path}>
          {children}
        </Route>
      </Router>
    </MockedProvider>
  );

  const renderResult = render(ui, { wrapper: Wrapper });
  return { ...renderResult, history };
};

const actWait = (amount?: number): Promise<void> => act(() => wait(amount));

export { actWait, customRender as render, renderWithRoute };

// re-export everything
export * from '@testing-library/react';
export { render as defaultRender } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
