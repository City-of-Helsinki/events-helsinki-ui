import i18n from 'i18next';
import React from 'react';
import wait from 'waait';

import { AboutPagesDocument } from '../../../generated/graphql';
import { fakeAboutPages } from '../../../test/mockDataUtils';
import { act, render, screen } from '../../../test/testUtils';
import AboutPage from '../AboutPage';

const fakeAboutPagesResponse = fakeAboutPages(1);

const mocks = [
  {
    request: {
      query: AboutPagesDocument,
    },
    result: {
      data: {
        aboutPages: fakeAboutPagesResponse,
      },
    },
  },
];

test('should render about page', async () => {
  render(<AboutPage />, { mocks });

  await act(wait);
  act(() => {
    i18n.changeLanguage('fi');
  });

  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].headingSection?.fi as string
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].contentSection?.fi as string
    )
  ).toBeInTheDocument();

  act(() => {
    i18n.changeLanguage('en');
  });

  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].headingSection?.en as string
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].contentSection?.en as string
    )
  ).toBeInTheDocument();

  act(() => {
    i18n.changeLanguage('sv');
  });

  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].headingSection?.sv as string
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      fakeAboutPagesResponse.data[0].contentSection?.sv as string
    )
  ).toBeInTheDocument();
});
