import { act } from '@testing-library/react';
import i18n from 'i18next';
import React from 'react';

import {
  CollectionListDocument,
  LandingPagesDocument,
} from '../../../../generated/graphql';
import {
  fakeCollections,
  fakeLandingPages,
} from '../../../../util/mockDataUtils';
import { actWait, render } from '../../../../util/testUtils';
import AppRoutes from '../AppRoutes';

const landingPagesResponse = { data: { landingPages: fakeLandingPages(1) } };
const collectionListResponse = {
  data: { collectionList: fakeCollections(1) },
};

const mocks = [
  {
    request: {
      query: LandingPagesDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: landingPagesResponse,
  },
  {
    request: {
      query: CollectionListDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: collectionListResponse,
  },
];

const renderComponent = (route: string) =>
  render(<AppRoutes />, { mocks, routes: [route] });

beforeEach(() => {
  act(() => {
    i18n.changeLanguage('fi');
  });
});

it('user from supported locale will be redirect to App with that locale', async () => {
  renderComponent('/en/');
  await actWait();

  expect(i18n.language).toEqual('en');
});

it('user from unsupported locale prefix will be redirect to route with support prefix', async () => {
  const { history } = renderComponent('/vi/');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/vi/');
});

it('user without locale prefix will be redirect to route with support prefix', async () => {
  const { history } = renderComponent('/foo-url');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/foo-url');
});

it('user with route with unsupport locale will be redirect to App anyway, with supported locale', async () => {
  const { history } = renderComponent('/dk/foo');
  await actWait();

  expect(i18n.language).toEqual('fi');
  expect(history.location.pathname).toContain('/fi/dk/foo');
});
