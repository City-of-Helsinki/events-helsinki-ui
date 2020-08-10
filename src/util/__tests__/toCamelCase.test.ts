import toCamelCase from '../toCamelCase';

describe('toCamelCase function', () => {
  it('convert snake case string to camel case', () => {
    expect(toCamelCase('STRING_TO_CAMEL_CASE')).toBe('stringToCamelCase');
  });
});
