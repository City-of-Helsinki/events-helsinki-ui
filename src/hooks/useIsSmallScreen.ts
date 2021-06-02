import useWindowSize from './useWindowSize';

const useIsSmallScreen = (): boolean => {
  const windowSize = useWindowSize();
  return Boolean(windowSize.width && windowSize.width <= 768);
};

export default useIsSmallScreen;
