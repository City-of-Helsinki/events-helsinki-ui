import isClient from './isClient';

const ScrollToTop = (): void => {
  if (isClient) {
    window.scrollTo(0, 0);
  }
};

export default ScrollToTop;
