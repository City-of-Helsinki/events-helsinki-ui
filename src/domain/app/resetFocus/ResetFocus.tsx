import React from 'react';
import { useLocation } from 'react-router';

import isClient from '../../../util/isClient';

export const resetFocusId = 'reset-focus';

/**
 * Ensure that browser focus is set to body when navigating using
 * <Link> from react-router-dom.
 */
const ResetFocus = (): React.ReactElement => {
  const { pathname } = useLocation();
  const node = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isClient) {
      node.current?.focus();
    }
  }, [pathname]);

  return <div ref={node} tabIndex={-1} id={resetFocusId} />;
};

export default ResetFocus;
