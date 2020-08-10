import getLocalisedString from '../getLocalisedString';

const dummyLocalisedObj = {
  en: 'text en',
  fi: 'text fi',
};

describe('getLocalisedString function', () => {
  it('should return localised string', () => {
    expect(getLocalisedString(dummyLocalisedObj, 'en')).toBe('text en');
    expect(getLocalisedString(dummyLocalisedObj, 'fi')).toBe('text fi');
  });
  it('should return string in default language when localised string is not found', () => {
    expect(getLocalisedString(dummyLocalisedObj, 'sv')).toBe('text fi');
  });
});
