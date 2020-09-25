import { act, renderHook } from '@testing-library/react-hooks';

import useBreakpoint from '../useBreakpoint';

test('should return correct breakpoint', async () => {
  global.innerWidth = 500;
  const { result } = renderHook(() => useBreakpoint());

  expect(result.current).toBe('xs');

  act(() => {
    global.innerWidth = 700;
    global.dispatchEvent(new Event('resize'));
  });
  expect(result.current).toBe('sm');

  act(() => {
    global.innerWidth = 1000;
    global.dispatchEvent(new Event('resize'));
  });
  expect(result.current).toBe('md');

  act(() => {
    global.innerWidth = 1100;
    global.dispatchEvent(new Event('resize'));
  });
  expect(result.current).toBe('lg');

  act(() => {
    global.innerWidth = 1500;
    global.dispatchEvent(new Event('resize'));
  });
  expect(result.current).toBe('xlg');
});
