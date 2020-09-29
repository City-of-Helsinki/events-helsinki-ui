import { BREAKPOINTS } from '../constants';
import { Breakpoint } from '../types';
import useWindowSize from './useWindowSize';

const useBreakpoint = (): Breakpoint => {
  const windowSize = useWindowSize();
  /* istanbul ignore next */
  if (windowSize.width === undefined) {
    return 'lg';
  } else if (windowSize.width < BREAKPOINTS.XS) {
    return 'xs';
  } else if (windowSize.width < BREAKPOINTS.SM) {
    return 'sm';
  } else if (windowSize.width < BREAKPOINTS.MD) {
    return 'md';
  } else if (windowSize.width < BREAKPOINTS.LG) {
    return 'lg';
  } else {
    return 'xlg';
  }
};

export default useBreakpoint;
