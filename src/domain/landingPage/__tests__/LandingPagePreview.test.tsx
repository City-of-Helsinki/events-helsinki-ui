import * as React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import { LandingPageDocument } from '../../../generated/graphql';
import {
  fakeBanner,
  fakeLandingPage,
  fakeLocalizedObject,
} from '../../../util/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../util/testUtils';
import { ROUTES } from '../../app/routes/constants';
import LandingPagePreview from '../LandingPagePreview';

const landingPageId = '1';
const topBannerDescription = 'Landing page description';
const topBannerTitle = 'Landing page title';
const bottomBannerDescription = 'bottom banner description';
const bottomBannerTitle = 'bottom banner title';
const landingPageResponse = {
  data: {
    landingPage: fakeLandingPage({
      id: landingPageId,
      description: fakeLocalizedObject(topBannerDescription),
      title: fakeLocalizedObject(topBannerTitle),
      bottomBanner: fakeBanner({
        title: fakeLocalizedObject(bottomBannerTitle),
        description: fakeLocalizedObject(bottomBannerDescription),
      }),
    }),
  },
};

const mocks = [
  {
    request: {
      query: LandingPageDocument,
      variables: {
        draft: true,
        id: landingPageId,
      },
    },
    result: landingPageResponse,
  },
];

const testPath = `${ROUTES.HOME_PREVIEW.replace(
  ':id',
  landingPageId
)}?draft=true`;
const routes = [testPath];

const renderComponent = () =>
  renderWithRoute(<LandingPagePreview />, {
    mocks,
    routes,
    path: ROUTES.HOME_PREVIEW,
  });

it('should render landing page previews correctly', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: topBannerTitle })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(topBannerDescription)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: bottomBannerTitle })
    ).toBeInTheDocument();
  });
  expect(screen.getByText(bottomBannerDescription)).toBeInTheDocument();
});

it('should show preview banners', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: topBannerTitle })
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: bottomBannerTitle })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(translations.commons.preview)).toBeInTheDocument();
});
