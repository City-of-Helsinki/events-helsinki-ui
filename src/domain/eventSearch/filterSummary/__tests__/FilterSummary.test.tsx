import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import {
  NeighborhoodListDocument,
  OrganizationDetailsDocument,
  PlaceDetailsDocument,
} from '../../../../generated/graphql';
import { render } from '../../../../util/testUtils';
import neighborhoodListResponse from '../../../neighborhood/__mocks__/neighborhoodListResponse';
import mockOrganization from '../../../organisation/__mocks__/organizationDetails';
import mockPlace from '../../../place/__mocks__/place';
import FilterSummary from '../FilterSummary';

const mocks = [
  {
    request: {
      query: NeighborhoodListDocument,
    },
    result: neighborhoodListResponse,
  },
  {
    request: {
      query: OrganizationDetailsDocument,
      variables: {
        id: mockOrganization.id,
      },
    },
    result: {
      data: {
        organizationDetails: mockOrganization,
      },
    },
  },
  {
    request: {
      query: PlaceDetailsDocument,
      variables: {
        id: mockPlace.id,
      },
    },
    result: {
      data: {
        placeDetails: mockPlace,
      },
    },
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
  divisions: 'kaupunginosa%3Aalppiharju',
  end: '2020-08-23',
  places: mockPlace.id as string,
  publisher: mockOrganization.id as string,
  start: '2020-08-20',
  text: 'jazz',
};

type UrlParamKeys = keyof UrlParams;

const routes = [
  // eslint-disable-next-line max-len
  `/fi/events?categories=${urlParams.categories}&dateTypes=today&divisions=${urlParams.divisions}&end=${urlParams.end}&places=${urlParams.places}&publisher=${urlParams.publisher}&start=${urlParams.start}&text=${urlParams.text}`,
];

it('matches snapshot', async () => {
  const { container } = render(<FilterSummary onClear={jest.fn()} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.queryByText((mockPlace.name || {})['fi'] || '')
    ).toBeInTheDocument();
  });

  expect(container.firstChild).toMatchSnapshot();
});

it('calls onClear callback when clear button is clicked ', async () => {
  const onClear = jest.fn();
  render(<FilterSummary onClear={onClear} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.queryByText((mockPlace.name || {})['fi'] || '')
    ).toBeDefined();
  });

  const button = screen.getByRole('button', {
    name: translations.eventSearch.buttonClearFilters,
  });

  userEvent.click(button);
  expect(onClear).toBeCalledTimes(1);
});

it('routes to correct url after deleting filters ', async () => {
  const { history } = render(<FilterSummary onClear={jest.fn()} />, {
    mocks,
    routes,
  });

  await waitFor(() => {
    expect(
      screen.queryByText((mockPlace.name || {})['fi'] || '')
    ).toBeDefined();
  });

  const items: { button: string; params: UrlParamKeys[] }[] = [
    { button: 'Poista suodatin: Tänään', params: ['dateTypes'] },
    {
      button: 'Poista suodatin: 20.08.2020 - 23.08.2020',
      params: ['end', 'start'],
    },
    { button: 'Poista suodatin: Elokuva', params: ['categories'] },
    { button: 'Poista suodatin: Alppiharju', params: ['divisions'] },
    { button: 'Poista suodatin: Gräsan taitojen talo', params: ['places'] },
    {
      button: 'Poista suodatin: Yleiset kulttuuripalvelut',
      params: ['publisher'],
    },
    { button: 'Poista suodatin: jazz', params: ['text'] },
  ];

  items.forEach(item => {
    item.params.forEach(param => {
      expect(new URLSearchParams(history.location.search).get(param)).toBe(
        decodeURIComponent(urlParams[param] || '')
      );
    });

    userEvent.click(
      screen.getByRole('button', {
        name: item.button,
      })
    );

    item.params.forEach(param => {
      expect(
        new URLSearchParams(history.location.search).get(param)
      ).toBeNull();
    });
  });
});
