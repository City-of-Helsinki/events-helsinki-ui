import { advanceTo, clear } from 'jest-date-mock';

import { DATE_TYPES } from '../../../constants';
import { Language } from '../../../types';
import { EVENT_SORT_OPTIONS } from '../../eventSearch/constants';
import { CATEGORIES, DEFAULT_SEARCH_FILTERS } from '../constants';
import { getNextPage, getSearchFilters, getSearchQuery } from '../utils';

describe('getSearchQuery function', () => {
  it('get search query', () => {
    expect(getSearchQuery(DEFAULT_SEARCH_FILTERS)).toBe('');

    expect(
      getSearchQuery({
        ...DEFAULT_SEARCH_FILTERS,
        categories: ['category1', 'category2'],
        dateTypes: ['type1', 'type2'],
        text: ['test'],
      })
    ).toBe('?categories=category1,category2&dateTypes=type1,type2&text=test');

    expect(
      getSearchQuery({
        ...DEFAULT_SEARCH_FILTERS,
        dateTypes: ['type1', 'type2'],
        end: new Date('2019-12-20'),
        start: new Date('2019-11-20'),
        text: ['test'],
      })
    ).toBe('?end=2019-12-20&start=2019-11-20&text=test');
  });
});

describe('getSearchFilters function', () => {
  it('return correct searchfilters when search query is given', () => {
    expect(getSearchFilters(new URLSearchParams('?moi=moi'))).toEqual(
      DEFAULT_SEARCH_FILTERS
    );

    expect(
      getSearchFilters(new URLSearchParams('?categories=123,321'))
    ).toEqual({
      ...DEFAULT_SEARCH_FILTERS,
      categories: ['123', '321'],
    });

    expect(
      getSearchFilters(
        new URLSearchParams('?categories=123,321&divisions=dkfjglr,kgkfjdur')
      )
    ).toEqual({
      ...DEFAULT_SEARCH_FILTERS,
      categories: ['123', '321'],
      divisions: ['dkfjglr', 'kgkfjdur'],
    });

    expect(
      getSearchFilters(
        new URLSearchParams(
          '?categories=123,321&divisions=dkfjglr,kgkfjdur&onlyOngoingCourses=true'
        )
      )
    ).toEqual({
      ...DEFAULT_SEARCH_FILTERS,
      categories: ['123', '321'],
      divisions: ['dkfjglr', 'kgkfjdur'],
      onlyOngoingCourses: true,
    });

    expect(
      getSearchFilters(
        new URLSearchParams(
          '?categories=123,321&divisions=dkfjglr,kgkfjdur&onlyOngoingCourses=true'
        )
      )
    ).toEqual({
      ...DEFAULT_SEARCH_FILTERS,
      categories: ['123', '321'],
      divisions: ['dkfjglr', 'kgkfjdur'],
      onlyOngoingCourses: true,
    });

    expect(
      getSearchFilters(
        new URLSearchParams(
          '?categories=123,321&divisions=dkfjglr,kgkfjdur&onlyOngoingCourses=true&start=12-12-2020&end=11-12-2020'
        )
      )
    ).toEqual({
      ...DEFAULT_SEARCH_FILTERS,
      categories: ['123', '321'],
      divisions: ['dkfjglr', 'kgkfjdur'],
      onlyOngoingCourses: true,
      end: new Date('2020-11-11T22:00:00.000Z'),
      start: new Date('2020-12-11T22:00:00.000Z'),
    });
  });
});

describe('getNextPage function', () => {
  it('should return next page', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?page=2',
        previous: null,
      })
    ).toBe(2);
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value&page=2',
        previous: null,
      })
    ).toBe(2);
  });

  it('should return null', () => {
    expect(
      getNextPage({
        count: 0,
        next: 'http://localhost:3000?text=value',
        previous: null,
      })
    ).toBeNull();
  });
});
