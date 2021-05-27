import React from 'react';

import Search from './Search';
import SearchPage from './SearchPage';

const EventSearchPageContainer: React.FC = () => (
  <SearchPage
    SearchComponent={Search}
    pageTitle="eventSearch.title"
    eventType="event"
  />
);

export default EventSearchPageContainer;
