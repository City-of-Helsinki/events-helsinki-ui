import { render, screen } from '@testing-library/react';
import React from 'react';

import translations from '../../../../common/translation/i18n/fi.json';
import SearchResultList from '../SearchResultList';

it('should return no results text if no events is found', async () => {
  const eventsData = { eventList: { meta: { count: 0 }, data: [] } };
  render(
    <SearchResultList
      eventsData={eventsData}
      loading={false}
      onLoadMore={jest.fn()}
    />
  );

  expect(
    screen.getByText(translations.eventSearch.noResultsInfo.bigText)
  ).toBeInTheDocument();
});
