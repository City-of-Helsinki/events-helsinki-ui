import getTimeFormat from '../getTimeFormat';

describe('getTimeFormat function', () => {
  it('should return correct time format', () => {
    expect(getTimeFormat('en')).toBe('h:mm aaaa');
    expect(getTimeFormat('fi')).toBe('HH.mm');
    expect(getTimeFormat('sv')).toBe('HH:mm');
    expect(getTimeFormat('fr')).toBe('HH.mm');
  });
});
