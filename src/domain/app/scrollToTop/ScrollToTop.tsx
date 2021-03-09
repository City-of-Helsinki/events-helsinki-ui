import React from 'react';
import { useHistory, useLocation } from 'react-router';

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
  const { action } = useHistory();

  React.useEffect(() => {
    if (isClient && action === 'PUSH') {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  return null;
};

export default ScrollToTop;
