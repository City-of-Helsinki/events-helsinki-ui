import { axe } from 'jest-axe';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '../../../../generated/graphql';
import {
  fakeNeighborhoods,
  fakeOrganization,
  fakePlace,
} from '../../../../test/mockDataUtils';
import {
  configure,
  render,
  screen,
  userEvent,
  waitFor,
} from '../../../../test/testUtils';
import FilterSummary from '../FilterSummary';

configure({ defaultHidden: true });

const neighborhoodId = 'arabia';
const neighborhoodName = 'Arabia';
const neighborhoods = fakeNeighborhoods(10, [
  {
    id: neighborhoodId,
    name: { fi: neighborhoodName },
  },
]);
const neighborhoodsResponse = {
  data: {
    neighborhoodList: neighborhoods,
  },
};

const organizationId = '1';
const organizationName = 'Organization name';
const organization = fakeOrganization({
  id: organizationId,
  name: organizationName,
});
const organizationResponse = { data: { organizationDetails: organization } };

const placeId = 'helsinki:123';
const placeName = 'Gräsan taitojen talo';

const place = fakePlace({ id: placeId, name: { fi: placeName } });
const placeResponse = {
  data: {
    placeDetails: place,
  },
};

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodsResponse,
  },
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: organizationId,
      },
    },
    result: organizationResponse,
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: placeId,
      },
    },
    result: placeResponse,
  },
];

interface UrlParams {
  categories: string;
  dateTypes: string;
  divisions: string;
  end: string;
  places: string;
  publisher: string;
  start: string;
  text: string;
}

const urlParams: UrlParams = {
  categories: 'movie',
  dateTypes: 'today',
  divisions: neighborhoodId,
  end: '2020-08-23',
  places: placeId,
  publisher: organizationId,
  start: '2020-08-20',
  text: 'jazz',
};

type UrlParamKeys = keyof UrlParams;

const routes = [
  // eslint-disable-next-line max-len
  `/fi/events?categories=${urlParams.categories}&dateTypes=today&divisions=${urlParams.divisions}&end=${urlParams.end}&places=${urlParams.places}&publisher=${urlParams.publisher}&start=${urlParams.start}&text=${urlParams.text}`,
];

it('test for accessibility violations', async () => {
  const { container } = render(<FilterSummary onClear={jest.fn()} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(screen.queryByText(placeName)).toBeInTheDocument();
  });
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('calls onClear callback when clear button is clicked', async () => {
  const onClear = jest.fn();
  render(<FilterSummary onClear={onClear} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(screen.queryByText(placeName)).toBeInTheDocument();
  });

  userEvent.click(
    screen.getByRole('button', {
      name: translations.eventSearch.buttonClearFilters,
    })
  );
  expect(onClear).toBeCalledTimes(1);
});

it('routes to correct url after deleting filters', async () => {
  const { history } = render(<FilterSummary onClear={jest.fn()} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(screen.queryByText(placeName)).toBeInTheDocument();
  });

  const items: { button: string; params: UrlParamKeys[] }[] = [
    { button: 'Poista suodatin: Tänään', params: ['dateTypes'] },
    {
      button: 'Poista suodatin: 20.8.2020 - 23.8.2020',
      params: ['end', 'start'],
    },
    { button: 'Poista suodatin: Elokuva', params: ['categories'] },
    {
      button: `Poista suodatin: ${neighborhoodName}`,
      params: ['divisions'],
    },
    { button: `Poista suodatin: ${placeName}`, params: ['places'] },
    {
      button: `Poista suodatin: ${organizationName}`,
      params: ['publisher'],
    },
    { button: 'Poista suodatin: jazz', params: ['text'] },
  ];

  items.forEach((item) => {
    item.params.forEach((param) => {
      expect(new URLSearchParams(history.location.search).get(param)).toBe(
        decodeURIComponent(urlParams[param])
      );
    });

    userEvent.click(
      screen.getByRole('button', {
        name: item.button,
      })
    );

    item.params.forEach((param) => {
      expect(
        new URLSearchParams(history.location.search).get(param)
      ).toBeNull();
    });
  });
});
