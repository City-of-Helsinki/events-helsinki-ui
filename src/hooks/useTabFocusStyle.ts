import * as React from 'react';

export const focusAttributeName = 'data-focus-visible-added';

/*
 * Adds given className to focusable elements only when focus is triggreded by tab-button.
 */
const useTabFocusStyle = ({
  container,
  className,
}: {
  container: React.MutableRefObject<HTMLElement | null>;
  className: string;
}): void => {
  const tabUsed = React.useRef<boolean>(false);

  const removeAttributes = (el: HTMLElement) => {
    el.classList.remove(className);
    el.removeAttribute(focusAttributeName);
  };

  const handleDocumentFocus = (e: FocusEvent) => {
    const targetElement = e.target as HTMLElement;
    if (container.current?.contains(targetElement)) {
      if (e.type === 'focusout') {
        removeAttributes(targetElement);
      }
      if (
        e.type === 'focusin' &&
        targetElement.tabIndex > -1 &&
        tabUsed.current
      ) {
        targetElement.classList.add(className);
        targetElement.setAttribute(focusAttributeName, '');
        tabUsed.current = false;
      }
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    const targetElement = e.target as HTMLElement;
    if (container.current?.contains(targetElement)) {
      container.current.querySelectorAll(`.${className}`).forEach((element) => {
        element.classList.remove(className);
        element.removeAttribute(focusAttributeName);
      });
    }
  };

  const handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      tabUsed.current = true;
    }
  };

  React.useEffect(() => {
    document.addEventListener('focusin', handleDocumentFocus);
    document.addEventListener('focusout', handleDocumentFocus);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('focusin', handleDocumentFocus);
      document.removeEventListener('focusout', handleDocumentFocus);
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTabFocusStyle;
