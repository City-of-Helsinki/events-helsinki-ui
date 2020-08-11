import getDateArray from '../getDateArray';

describe('getDateArray function', () => {
  it('should return date array', () => {
    expect(getDateArray('2020-08-12')).toEqual([2020, 8, 12, 3, 0]);
  });
});
