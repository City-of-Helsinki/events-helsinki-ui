import { act, renderHook } from '@testing-library/react-hooks';
import i18n from 'i18next';

import useLocale from '../useLocale';

beforeEach(() => {
  act(() => {
    i18n.changeLanguage('fi');
  });
});

test('should return selected language', () => {
  const { result } = renderHook(() => useLocale());

  expect(result.current).toBe('fi');

  act(() => {
    i18n.changeLanguage('sv');
  });

  expect(result.current).toBe('sv');

  act(() => {
    i18n.changeLanguage('en');
  });

  expect(result.current).toBe('en');
});

test('should return default language', () => {
  const { result } = renderHook(() => useLocale());

  act(() => {
    i18n.changeLanguage('fr');
  });

  expect(result.current).toBe('fi');
});
