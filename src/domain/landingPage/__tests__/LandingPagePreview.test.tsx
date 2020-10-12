import React from 'react';

import translations from '../../../common/translation/i18n/fi.json';
import { LandingPageDocument } from '../../../generated/graphql';
import { fakeLandingPage } from '../../../util/mockDataUtils';
import { renderWithRoute, screen, waitFor } from '../../../util/testUtils';
import { ROUTES } from '../../app/routes/constants';
import LandingPagePreview from '../LandingPagePreview';

const landingPageId = '1';
const landingPageDescription = 'Landing page description';
const landingPageTitle = 'Landing page title';
const landingPageResponse = {
  data: {
    landingPage: fakeLandingPage({
      id: landingPageId,
      description: { fi: landingPageDescription },
      title: { fi: landingPageTitle },
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

it('should render landing page preview correctly', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: landingPageTitle })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(landingPageDescription)).toBeInTheDocument();
});

it('should show preview banner', async () => {
  renderComponent();

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: landingPageTitle })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(translations.commons.preview)).toBeInTheDocument();
});
