import React from 'react';
import { useLocation } from 'react-router';

import isClient from '../../../util/isClient';

/**
 * Ensure that browser scrolls to top when navigating using
 * <Link> from react-router-dom.
 *
 * Implementation fetched from
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (isClient) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
