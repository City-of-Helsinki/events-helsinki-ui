import React from 'react';

import {
  CollectionListDocument,
  LandingPagesDocument,
} from '../../../generated/graphql';
import { fakeCollections, fakeLandingPages } from '../../../util/mockDataUtils';
import { render, screen, waitFor } from '../../../util/testUtils';
import LandingPage from '../LandingPage';

const landingPageDescription = 'Landing page description';
const landingPageTitle = 'Landing page title';
const landingPagesResponse = {
  data: {
    landingPages: fakeLandingPages(1, [
      {
        description: { fi: landingPageDescription },
        title: { fi: landingPageTitle },
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
    expect(screen.getByText(landingPageTitle)).toBeInTheDocument();
  });

  expect(screen.getByText(landingPageDescription)).toBeInTheDocument();
  collections.data.forEach((collection) => {
    expect(screen.getByText(collection.title.fi)).toBeInTheDocument();
    expect(screen.getByText(collection.description.fi)).toBeInTheDocument();
  });
});
