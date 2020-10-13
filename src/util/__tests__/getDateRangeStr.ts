import getDateRangeStr from '../getDateRangeStr';

describe('getDateRangeStr function', () => {
  it('should return date range in correct format', () => {
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: null,
        locale: 'fi',
      })
    ).toBe('Ti 3.12.2019');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: null,
        locale: 'en',
      })
    ).toBe('Tue 3.12.2019');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: null,
        locale: 'en',
        includeTime: true,
        timeAbbreviation: 'at',
      })
    ).toBe('Tue 3.12.2019, at 10:42 a.m.');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: '2019-12-04T02:42:36.318755Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      })
    ).toBe('Ti 3.12.2019, klo 10.42 – 04.42');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: '2019-12-03T10:42:36.318755Z',
        locale: 'fi',
        includeTime: false,
      })
    ).toBe('Ti 3.12.2019');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: '2019-12-03T10:42:36.318755Z',
        locale: 'fi',
        includeTime: true,
        timeAbbreviation: 'klo',
      })
    ).toBe('Ti 3.12.2019, klo 10.42 – 12.42');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: '2019-12-04T02:42:36.318755Z',
        locale: 'fi',
        includeWeekday: false,
        includeTime: true,
        timeAbbreviation: 'klo',
      })
    ).toBe('3.12.2019, klo 10.42 – 04.42');
    expect(
      getDateRangeStr({
        start: '2019-12-03T08:42:36.318755Z',
        end: '2019-12-13T10:42:36.318755Z',
        locale: 'fi',
      })
    ).toBe('3 – 13.12.2019');
    expect(
      getDateRangeStr({
        start: '2019-11-03T08:42:36.318755Z',
        end: '2019-12-13T10:42:36.318755Z',
        locale: 'fi',
      })
    ).toBe('3.11 – 13.12.2019');
    expect(
      getDateRangeStr({
        start: '2019-11-03T08:42:36.318755Z',
        end: '2020-12-13T10:42:36.318755Z',
        locale: 'fi',
      })
    ).toBe('3.11.2019 – 13.12.2020');
  });
});
