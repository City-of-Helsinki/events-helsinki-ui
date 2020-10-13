import { fireEvent } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';

import useDropdownKeyboardNavigation, {
  KeyboardNavigationProps,
} from '../useDropdownKeyboardNavigation';

function renderNavigationHook(
  props: Pick<KeyboardNavigationProps, 'initialFocusedIndex' | 'listLength'>
) {
  const div = document.createElement('div');
  div.setAttribute('tabIndex', '0');
  document.body.appendChild(div);
  const { result, ...rest } = renderHook(() =>
    useDropdownKeyboardNavigation({ ...props, container: { current: div } })
  );

  result.current.setup();
  div.focus();

  function keyDown(key: string) {
    result.current.teardown();
    result.current.setup();

    act(() => {
      fireEvent.keyDown(div, { key });
    });
  }

  function arrowDown() {
    keyDown('ArrowDown');
  }

  function arrowUp() {
    keyDown('ArrowUp');
  }

  return { result, ...rest, arrowDown, arrowUp };
}

describe('useDropdownKeyboardNavigation', () => {
  it('changes focusedIndex correctly', async () => {
    const { result, arrowDown, arrowUp } = renderNavigationHook({
      listLength: 4,
    });

    arrowDown();

    expect(result.current.focusedIndex).toBe(0);

    arrowDown();
    arrowDown();

    expect(result.current.focusedIndex).toBe(2);

    arrowDown();

    expect(result.current.focusedIndex).toBe(3);

    arrowDown();

    expect(result.current.focusedIndex).toBe(0);

    arrowUp();

    expect(result.current.focusedIndex).toBe(3);
  });

  it('changes focusedIndex correctly when initialFocusedIndex is given and arrow down is pressed', () => {
    const { result, arrowDown } = renderNavigationHook({
      initialFocusedIndex: 2,
      listLength: 4,
    });

    arrowDown();

    expect(result.current.focusedIndex).toBe(2);

    arrowDown();

    expect(result.current.focusedIndex).toBe(3);

    arrowDown();

    expect(result.current.focusedIndex).toBe(0);
  });

  it('changes focusedIndex correctly when initialFocusedIndex is given and arrow up is pressed', () => {
    const { result, arrowUp } = renderNavigationHook({
      initialFocusedIndex: 2,
      listLength: 4,
    });

    arrowUp();

    expect(result.current.focusedIndex).toBe(1);

    arrowUp();

    expect(result.current.focusedIndex).toBe(0);

    arrowUp();

    expect(result.current.focusedIndex).toBe(3);
  });
});
