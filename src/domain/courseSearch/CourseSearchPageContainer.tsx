import React from 'react';

import SearchPage from '../eventSearch/SearchPage';
import CourseSearch from './Search';

const CourseSearchPageContainer: React.FC = () => (
  <SearchPage
    SearchComponent={CourseSearch}
    pageTitle="courseSearch.title"
    eventType="course"
  />
);

export default CourseSearchPageContainer;
