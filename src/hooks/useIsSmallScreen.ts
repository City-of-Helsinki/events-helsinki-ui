import useWindowSize from './useWindowSize';

export default () => {
  const windowSize = useWindowSize();
  return windowSize.width && windowSize.width <= 768;
};
