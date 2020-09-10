import React from 'react';
import { useLocation } from 'react-router';
import { scroller } from 'react-scroll';

import { MAIN_CONTENT_ID } from '../../../constants';

interface Props {
  duration?: number;
  offset?: number;
}

const MainContent: React.FC<Props> = ({
  children,
  duration = 100,
  offset = -150,
}) => {
  const { hash, state } = useLocation();
  const mainContent = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (state?.toMainContent || (hash && hash.endsWith(MAIN_CONTENT_ID))) {
      const scrollToContent = () => {
        scroller.scrollTo(MAIN_CONTENT_ID, {
          delay: 0,
          duration: duration,
          offset: offset,
          smooth: true,
        });
      };

      scrollToContent();
      setTimeout(() => {
        mainContent.current?.focus();
      }, duration);
    }
  }, [duration, hash, offset, state]);

  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} ref={mainContent}>
      {children}
    </main>
  );
};

export default MainContent;
