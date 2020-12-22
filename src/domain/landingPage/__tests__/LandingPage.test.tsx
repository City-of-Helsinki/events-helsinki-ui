import * as React from 'react';

import {
  CollectionListDocument,
  LandingPagesDocument,
} from '../../../generated/graphql';
import {
  fakeBanner,
  fakeCollections,
  fakeLandingPages,
  fakeLocalizedObject,
} from '../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../util/testUtils';
import LandingPage from '../LandingPage';

const topBannerDescription = 'topBanner page description';
const bottomBannerDescription = 'bottomBanner description';
const landingPageTitle = 'Landing page title';
const landingPagesResponse = {
  data: {
    landingPages: fakeLandingPages(1, [
      {
        description: fakeLocalizedObject(topBannerDescription),
        bottomBanner: fakeBanner({
          description: fakeLocalizedObject(bottomBannerDescription),
        }),
        title: fakeLocalizedObject(landingPageTitle),
      },
    ]),
  },
};

const collections = fakeCollections(1);
const collectionsResponse = {
  data: {
    collectionList: collections,
  },
};

const mocks = [
  {
    request: {
      query: CollectionListDocument,
      variables: {
        visibleOnFrontpage: true,
      },
    },
    result: collectionsResponse,
  },
  {
    request: {
      query: LandingPagesDocument,
      variables: {
        visibleOnFrontpage: true,
      },
    },
    result: landingPagesResponse,
  },
];

it('should render landing page correctly', async () => {
  render(<LandingPage />, {
    mocks,
  });

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: landingPageTitle })
    ).toBeInTheDocument();
  });

  expect(screen.getByText(topBannerDescription)).toBeInTheDocument();
  collections.data.forEach((collection) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    expect(screen.getByText(collection.description.fi)).toBeInTheDocument();
  });
  expect(screen.getByText(bottomBannerDescription)).toBeInTheDocument();
});
