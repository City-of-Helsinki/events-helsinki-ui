import i18n from 'i18next';
import React from 'react';
import wait from 'waait';

import { AboutPagesDocument } from '../../../generated/graphql';
import { fakeAboutPages } from '../../../util/mockDataUtils';
import { act, render, screen } from '../../../util/testUtils';
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
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].headingSection?.fi as string
    )
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].contentSection?.fi as string
    )
  ).toHaveLength(1);

  act(() => {
    i18n.changeLanguage('en');
  });

  expect(
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].headingSection?.en as string
    )
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].contentSection?.en as string
    )
  ).toHaveLength(1);

  act(() => {
    i18n.changeLanguage('sv');
  });

  expect(
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].headingSection?.sv as string
    )
  ).toHaveLength(1);
  expect(
    screen.getAllByText(
      fakeAboutPagesResponse.data[0].contentSection?.sv as string
    )
  ).toHaveLength(1);
});
