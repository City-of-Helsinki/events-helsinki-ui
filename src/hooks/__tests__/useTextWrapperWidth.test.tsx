import { renderHook } from '@testing-library/react-hooks';

import useTextWrapperWidth from '../useTextWrapperWidth';

test('should return correct text wrapper width', async () => {
  const { result } = renderHook(() =>
    useTextWrapperWidth({
      font: `600 52px Arial`,
      maxTextWrapperWidth: 400,
      title: 'Wow! Kaiken maailman kulttuuria',
    })
  );

  expect(result.current).toBe(322);

  const { result: result2 } = renderHook(() =>
    useTextWrapperWidth({
      font: `600 80px Arial`,
      maxTextWrapperWidth: 560,
      title: 'Wow! Kaiken maailman kulttuuria',
    })
  );

  expect(result2.current).toBe(495);
});

test('should return greater value than maxTextWrapperWidth when single word is overflowing', async () => {
  const { result } = renderHook(() =>
    useTextWrapperWidth({
      font: `600 80px Arial`,
      maxTextWrapperWidth: 560,
      title: 'Veryverylongword',
    })
  );

  expect(result.current).toBe(691);
});

test('should return null', async () => {
  const { result } = renderHook(() =>
    useTextWrapperWidth({
      font: `600 52px Arial`,
      maxTextWrapperWidth: 400,
      title: '',
    })
  );

  expect(result.current).toBeNull();

  const { result: result2 } = renderHook(() =>
    useTextWrapperWidth({
      font: `600 80px Arial`,
      maxTextWrapperWidth: null,
      title: 'Wow! Kaiken maailman kulttuuria',
    })
  );

  expect(result2.current).toBeNull();
});
