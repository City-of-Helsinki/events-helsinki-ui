import { MockedProvider } from '@apollo/react-testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Router, { MemoryRouter } from 'react-router';

import mockCollection from '../__mocks__/collection';
import translations from '../../../common/translation/i18n/fi.json';
import { CollectionDetailsDocument } from '../../../generated/graphql';
import CollectionPageContainer from '../CollectionPageContainer';

const mocks = [
  {
    request: {
      query: CollectionDetailsDocument,
      variables: {
        draft: false,
        slug: mockCollection.slug,
      },
    },
    result: {
      data: {
        collectionDetails: mockCollection,
      },
    },
  },
];

const mocksForPreview = [
  {
    request: {
      query: CollectionDetailsDocument,
      variables: {
        draft: true,
        slug: mockCollection.slug,
      },
    },
    result: {
      data: {
        collectionDetails: mockCollection,
      },
    },
  },
];

beforeEach(() => {
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ slug: mockCollection.slug });
});

it('matches snapshot', async () => {
  const { container } = render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <MemoryRouter initialEntries={[`/fi/collection/${mockCollection.slug}`]}>
        <CollectionPageContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText((mockCollection.title || {})['fi'] || '')
    ).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});

it('should show PreviewBanner if draft version is requested ', async () => {
  render(
    <MockedProvider mocks={mocksForPreview} addTypename={true}>
      <MemoryRouter
        initialEntries={[`/fi/collection/${mockCollection.slug}/?draft=true`]}
      >
        <CollectionPageContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText((mockCollection.title || {})['fi'] || '')
    ).toBeInTheDocument();
  });
  expect(screen.getByText(translations.commons.preview)).toBeInTheDocument();
});

it("should show 'not found' page if collection doesn't exist", async () => {
  render(
    <MockedProvider mocks={[]} addTypename={true}>
      <MemoryRouter initialEntries={[`/fi/collection/${mockCollection.slug}`]}>
        <CollectionPageContainer />
      </MemoryRouter>
    </MockedProvider>
  );

  await waitFor(() => {
    expect(
      screen.getByText(translations.collection.notFound.title)
    ).toBeInTheDocument();
  });
});
