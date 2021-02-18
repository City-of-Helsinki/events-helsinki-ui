import React, { FunctionComponent } from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader: FunctionComponent = () => {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={18}
      viewBox="0 0 100% 18"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="3" ry="3" width="100%" height="18" />
    </ContentLoader>
  );
};

export default SkeletonLoader;
