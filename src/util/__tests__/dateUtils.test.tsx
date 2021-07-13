import { convertFinnishDateStrToDate, formatDate } from '../dateUtils';

describe('formatDate function', () => {
  it('format date value', () => {
    expect(formatDate(null)).toBe('');

    expect(formatDate(new Date('2019-11-08T12:27:34+02:00'))).toBe('8.11.2019');

    expect(
      formatDate(new Date('2019-11-08T12:27:34+02:00'), 'dd.M.yyy hh:mm')
    ).toBe('08.11.2019 12:27');
  });
});

describe('convertFinnishDateStrToDate function', () => {
  it('covert string to date', () => {
    expect(convertFinnishDateStrToDate('')).toBe(null);

    expect(convertFinnishDateStrToDate('12.12.2019')).toStrictEqual(
      new Date(Date.UTC(2019, 11, 11, 22))
    );

    expect(convertFinnishDateStrToDate('12122019')).toStrictEqual(
      new Date(Date.UTC(2019, 11, 11, 22))
    );
    expect(convertFinnishDateStrToDate('12132019')).toBeNull();
  });
});
