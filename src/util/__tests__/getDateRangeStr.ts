import getDateRangeStr from '../getDateRangeStr';

describe('getDateRangeStr function', () => {
  it('should return date range string in Finnish', () => {
    expect(getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'fi')).toBe(
      'Ti 3.12.2019'
    );
    expect(
      getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'fi', false)
    ).toBe('3.12.2019');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        null,
        'fi',
        true,
        true,
        'klo'
      )
    ).toBe('Ti 3.12.2019, klo 10.42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-03T10:42:36.318755Z',
        'fi',
        true,
        true,
        'klo'
      )
    ).toBe('Ti 3.12.2019, klo 10.42 – 12.42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T02:42:36.318755Z',
        'fi',
        true,
        true,
        'klo'
      )
    ).toBe('Ti 3.12.2019, klo 10.42 – 04.42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T03:42:36.318755Z',
        'fi',
        true,
        true,
        'klo'
      )
    ).toBe('3.12.2019, klo 10.42 – 4.12.2019, klo 05.42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'fi'
      )
    ).toBe('3 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'fi'
      )
    ).toBe('3.11 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2020-12-13T10:42:36.318755Z',
        'fi'
      )
    ).toBe('3.11.2019 – 13.12.2020');
  });

  it('should return date range string in Swedish', () => {
    expect(getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'sv')).toBe(
      'Ti 3.12.2019'
    );
    expect(
      getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'sv', false)
    ).toBe('3.12.2019');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        null,
        'sv',
        true,
        true,
        'kl.'
      )
    ).toBe('Ti 3.12.2019, kl. 10:42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-03T10:42:36.318755Z',
        'sv',
        true,
        true,
        'kl.'
      )
    ).toBe('Ti 3.12.2019, kl. 10:42 – 12:42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T02:42:36.318755Z',
        'sv',
        true,
        true,
        'kl.'
      )
    ).toBe('Ti 3.12.2019, kl. 10:42 – 04:42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T03:42:36.318755Z',
        'sv',
        true,
        true,
        'kl.'
      )
    ).toBe('3.12.2019, kl. 10:42 – 4.12.2019, kl. 05:42');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'sv'
      )
    ).toBe('3 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'sv'
      )
    ).toBe('3.11 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2020-12-13T10:42:36.318755Z',
        'sv'
      )
    ).toBe('3.11.2019 – 13.12.2020');
  });

  it('should return date range string in English', () => {
    expect(getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'en')).toBe(
      'Tue 3.12.2019'
    );
    expect(
      getDateRangeStr('2019-12-03T08:42:36.318755Z', null, 'en', false)
    ).toBe('3.12.2019');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        null,
        'en',
        true,
        true,
        'at'
      )
    ).toBe('Tue 3.12.2019, at 10:42 a.m.');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-03T10:42:36.318755Z',
        'en',
        true,
        true,
        'at'
      )
    ).toBe('Tue 3.12.2019, at 10:42 a.m. – 12:42 p.m.');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T02:42:36.318755Z',
        'en',
        true,
        true,
        'at'
      )
    ).toBe('Tue 3.12.2019, at 10:42 a.m. – 4:42 a.m.');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-04T03:42:36.318755Z',
        'en',
        true,
        true,
        'at'
      )
    ).toBe('3.12.2019, at 10:42 a.m. – 4.12.2019, at 5:42 a.m.');
    expect(
      getDateRangeStr(
        '2019-12-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'en'
      )
    ).toBe('3 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2019-12-13T10:42:36.318755Z',
        'en'
      )
    ).toBe('3.11 – 13.12.2019');
    expect(
      getDateRangeStr(
        '2019-11-03T08:42:36.318755Z',
        '2020-12-13T10:42:36.318755Z',
        'en'
      )
    ).toBe('3.11.2019 – 13.12.2020');
  });
});
