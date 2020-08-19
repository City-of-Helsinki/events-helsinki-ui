import { DEFAULT_SEARCH_FILTERS } from '../constants';
import { getSearchQuery } from '../utils';

describe('getSearchQuery function', () => {
  it('get search query', () => {
    expect(getSearchQuery(DEFAULT_SEARCH_FILTERS)).toBe('');

    expect(
      getSearchQuery({
        ...DEFAULT_SEARCH_FILTERS,
        categories: ['category1', 'category2'],
        dateTypes: ['type1', 'type2'],
        text: 'test',
      })
    ).toBe('?categories=category1,category2&dateTypes=type1,type2&text=test');

    expect(
      getSearchQuery({
        ...DEFAULT_SEARCH_FILTERS,
        dateTypes: ['type1', 'type2'],
        end: new Date('2019-12-20'),
        start: new Date('2019-11-20'),
        text: 'test',
      })
    ).toBe('?end=2019-12-20&start=2019-11-20&text=test');
  });
});
