import {
  getLanguageFromUrl,
  translateList,
  translateValue,
} from '../translateUtils';

const t = (text: string): string => text;

describe('Translation utils', () => {
  it('Translate value', () => {
    expect(translateValue('somePrefix', 'SOME_VALUE', t)).toBe(
      'somePrefixSomeValue'
    );
    expect(translateValue('', 'SOME_VALUE', t)).toBe('someValue');
  });

  it('Translates lists', () => {
    expect(
      translateList(
        'somePrefix',
        ['SOME_VALUE', 'SOME_OTHER_VALUE', 'YET_ANOTHER_VALUE'],
        t
      )
    ).toBe(
      'somePrefixSomeValue, somePrefixSomeOtherValue, somePrefixYetAnotherValue'
    );
  });

  it('Get language from url', () => {
    expect(getLanguageFromUrl('/fi/test')).toBe('fi');
    expect(getLanguageFromUrl('/en/test')).toBe('en');
    expect(getLanguageFromUrl('/sv/test')).toBe('sv');
    expect(getLanguageFromUrl('/invalid/test')).toBe('fi');
  });
});

export {};
