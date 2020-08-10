import React, { useCallback } from 'react';

interface Props {
  container: React.MutableRefObject<HTMLDivElement | null>;
  listLength: number;
}

const useDropdownKeyboardNavigation = ({
  container,
  listLength,
}: Props): [number, Function, Function] => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const isStartingPosition = focusedIndex === -1;

  const focusOption = React.useCallback(
    (direction: 'down' | 'up') => {
      switch (direction) {
        case 'down':
          setFocusedIndex(focusedIndex < listLength - 1 ? focusedIndex + 1 : 0);
          break;
        case 'up':
          setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : listLength - 1);
          break;
      }
    },
    [listLength, focusedIndex]
  );

  const isComponentFocused = useCallback(() => {
    const active = document.activeElement;
    const current = container && container.current;

    if (current && active instanceof Node && current.contains(active)) {
      return true;
    }
    return false;
  }, [container]);

  const onKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      // Handle keyboard events only if current element is focused
      if (!isComponentFocused()) return;

      switch (event.key) {
        case 'ArrowUp':
          if (isStartingPosition) {
            setFocusedIndex(listLength - 1);
          } else {
            focusOption('up');
          }
          event.preventDefault();
          break;
        case 'ArrowDown':
          focusOption('down');
          event.preventDefault();
          break;
        case 'Escape':
          setFocusedIndex(-1);
          event.preventDefault();
          break;
      }
    },
    [focusOption, isComponentFocused, isStartingPosition, listLength]
  );

  const setup = React.useCallback(() => {
    document.addEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  const teardown = React.useCallback(() => {
    document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  React.useEffect(() => {
    // Whenever the list changes, reset focused index
    setFocusedIndex(-1);
  }, [listLength]);

  return [focusedIndex, setup, teardown];
};

export default useDropdownKeyboardNavigation;
