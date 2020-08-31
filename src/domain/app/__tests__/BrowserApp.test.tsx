import { act } from '@testing-library/react';
import i18n from 'i18next';
import React from 'react';
import wait from 'waait';

import {
  CollectionListDocument,
  LandingPagesDocument,
} from '../../../generated/graphql';
import { render } from '../../../util/testUtils';
import mockCollection from '../../collection/__mocks__/collection';
import mockLandingPage from '../../landingPage/__mocks__/landingPage';
import AppRoutes from '../AppRoutes';

const mocks = [
  {
    request: {
      query: LandingPagesDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: {
      data: {
        landingPages: {
          __typename: 'LandingPageResponse',
          data: [mockLandingPage],
        },
      },
    },
  },
  {
    request: {
      query: CollectionListDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: {
      data: {
        collectionList: {
          __typename: 'CollectionListResponse',
          data: [mockCollection],
        },
      },
    },
  },
];

export async function actWait(amount = 0): Promise<void> {
  await act(async () => {
    await wait(amount);
  });
}

const getWrapper = (route: string) =>
  render(<AppRoutes />, { mocks, routes: [route] });

beforeEach(() => {
  act(() => {
    i18n.changeLanguage('fi');
  });
});

it('user from supported locale will be redirect to App with that locale', async () => {
  getWrapper('/en/');
  await actWait();

  expect(i18n.language).toEqual('en');
});

it('user from unsupported locale prefix will be redirect to route with support prefix', async () => {
  const { history } = getWrapper('/vi/');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/vi/');
});

it('user without locale prefix will be redirect to route with support prefix', async () => {
  const { history } = getWrapper('/foo-url');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/foo-url');
});

it('user with route with unsupport locale will be redirect to App anyway, with supported locale', async () => {
  const { history } = getWrapper('/dk/foo');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/dk/foo');
});
