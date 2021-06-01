import { MockedResponse } from '@apollo/client/testing';
import i18n from 'i18next';
import * as React from 'react';

import {
  CollectionFieldsFragment,
  LandingPagesDocument,
  PlaceDetailsDocument,
} from '../../../../generated/graphql';
import { getCollectionDetailsMock } from '../../../../test/apollo-mocks/collectionsDetailsMocks';
import { getEventsByIdsMock } from '../../../../test/apollo-mocks/eventByIdsMocks';
import { createEventListRequestAndResultMocks } from '../../../../test/apollo-mocks/eventListMocks';
import { getCollectionQueryListMocks } from '../../../../test/collections/collections.common.tests';
import {
  fakeCollection,
  fakeCollections,
  fakeEvent,
  fakeEvents,
  fakeLandingPages,
  fakeLocalizedObject,
  fakePlace,
} from '../../../../test/mockDataUtils';
import {
  actWait,
  configure,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils';
import {
  MAPPED_PLACES,
  MARKETING_COLLECTION_SLUGS,
} from '../../../eventSearch/constants';
import AppRoutes from '../AppRoutes';

const placeToPlaceString = {
  annantalo: 'Annantalo',
  caisa: 'Caisa',
  espanlava: 'Espanlava',
  kanneltalo: 'Kanneltalo',
  maunulatalo: 'Maunula-talo',
  savoyteatteri: 'Savoy-teatteri',
  stoa: 'Stoa',
  vuotalo: 'Vuotalo',
};

const curatedEventId = 'kulke:51381';
const curatedEventName = 'Curated event name';

configure({ defaultHidden: true });

const landingPagesResponse = { data: { landingPages: fakeLandingPages(1) } };
const collections = fakeCollections(1);

const eventsByIds = [
  fakeEvent({
    id: curatedEventId,
    name: fakeLocalizedObject(curatedEventName),
  }),
];

const createFakeResponseEvents = () => fakeEvents(3);

const mocks = [
  {
    request: {
      query: LandingPagesDocument,
      variables: { visibleOnFrontpage: true },
    },
    result: landingPagesResponse,
  },
  ...getCollectionQueryListMocks(collections, { visibleOnFrontpage: true }),
  // generate mock response for each place query
  ...Object.keys(MAPPED_PLACES).map((key) =>
    createEventListRequestAndResultMocks({
      variables: {
        allOngoing: true,
        division: [],
        location: [MAPPED_PLACES[key]],
      },
      response: createFakeResponseEvents(),
    })
  ),
  ...Object.keys(MAPPED_PLACES).map((key) => {
    return {
      request: {
        query: PlaceDetailsDocument,
        variables: {
          id: MAPPED_PLACES[key],
        },
      },
      result: {
        data: {
          placeDetails: fakePlace({
            name: fakeLocalizedObject(placeToPlaceString[key]),
          }),
        },
      },
    };
  }),
];

const getCollectionMocks = (
  collectionDetails: CollectionFieldsFragment,
  draft = false
): MockedResponse[] => [
  getCollectionDetailsMock({
    variables: { draft, slug: collectionDetails.slug },
    collectionDetails,
  }),
  getEventsByIdsMock({
    variables: { ids: [curatedEventId], include: ['location'] },
    eventsByIds,
  }),
];

const renderComponent = (
  route: string,
  requestMocks: MockedResponse[] = mocks
) => render(<AppRoutes />, { mocks: requestMocks, routes: [route] });

beforeEach(() => {
  i18n.changeLanguage('fi');
});

it('user from supported locale will be redirect to App with that locale', async () => {
  renderComponent('/en');

  await waitFor(() => {
    expect(i18n.language).toEqual('en');
  });
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

describe('test each place path /:locale/:place', () => {
  Object.keys(MAPPED_PLACES).forEach((place) => {
    it(`renders event search with place from path: ${place}`, async () => {
      renderComponent(`/fi/${place}`);

      const textContentRegex = new RegExp(placeToPlaceString[place], 'ig');

      // make sure place dropdown initializes with the place from path
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /etsi tapahtumapaikka/i })
        ).toHaveTextContent(textContentRegex);
      });

      expect(screen.queryByText('Mitä etsit?')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: 'Tapahtumahaku' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { name: '3 hakutulosta' })
      ).toBeInTheDocument();
    });
  });
});

describe('test each marketing collection /:locale/:slug', () => {
  MARKETING_COLLECTION_SLUGS.forEach((slug) => {
    const expectedCollection = fakeCollection({
      slug,
    }) as CollectionFieldsFragment;

    it(`renders collection page for: ${slug} when found`, async () => {
      renderComponent(`/fi/${slug}`, getCollectionMocks(expectedCollection));
      await waitFor(() => {
        expect(
          screen.getByText(expectedCollection.title.fi)
        ).toBeInTheDocument();
        expect(
          screen.getByText(expectedCollection.description.fi)
        ).toBeInTheDocument();
      });
    });
    it(`renders not found -collection page when ${slug} not found`, async () => {
      renderComponent(`/fi/${slug}`);
      await waitFor(() => {
        expect(
          screen.getByText(/Syystä tai toisesta hakemaasi kokoelmaa ei löydy/)
        ).toBeInTheDocument();
      });
    });
  });
});
