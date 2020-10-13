import useWindowSize from './useWindowSize';

export default (): boolean => {
  const windowSize = useWindowSize();
  return Boolean(windowSize.width && windowSize.width <= 768);
};
