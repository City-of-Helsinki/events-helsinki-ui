import isClient from './isClient';

export default (): void => {
  if (isClient) {
    window.scrollTo(0, 0);
  }
};
