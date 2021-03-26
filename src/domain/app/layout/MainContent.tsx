import React from 'react';
import { useLocation } from 'react-router';
import { scroller } from 'react-scroll';

import { MAIN_CONTENT_ID } from '../../../constants';

interface Props {
  duration?: number;
  // This is mainly for testing purposes to test that the scroll function is called properly
  onScrollFn?: () => void;
  offset?: number;
}

const MainContent: React.FC<Props> = ({
  children,
  duration = 100,
  offset = -150,
  onScrollFn,
}) => {
  const { hash, state } = useLocation();
  const mainContent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (state?.toMainContent || (hash && hash.endsWith(MAIN_CONTENT_ID))) {
      const scrollToContent = () => {
        if (onScrollFn) {
          onScrollFn();
        } else {
          scroller.scrollTo(MAIN_CONTENT_ID, {
            delay: 0,
            duration: duration,
            offset: offset,
            smooth: true,
          });
        }
      };

      scrollToContent();
      setTimeout(() => {
        const focusable = mainContent.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable?.[0]) {
          (focusable[0] as HTMLElement).focus();
        }
      }, duration);
    }
  }, [duration, hash, offset, onScrollFn, state]);

  return (
    <main
      id={MAIN_CONTENT_ID}
      ref={mainContent}
      // event out the minus margin of footer
      style={{ paddingBottom: '2rem' }}
    >
      {children}
    </main>
  );
};

export default MainContent;
