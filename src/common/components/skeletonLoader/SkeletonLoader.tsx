import React, { FunctionComponent } from 'react';
import ContentLoader from 'react-content-loader';

interface Props {
  width?: string;
  height?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}

const SkeletonLoader: FunctionComponent<Props> = ({
  width = '200',
  height = '18',
  backgroundColor = '#f3f3f3',
  foregroundColor = '#ecebeb',
}) => {
  return (
    <ContentLoader
      speed={2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
    >
      <rect x="0" y="0" rx="3" ry="3" width={width} height={height} />
    </ContentLoader>
  );
};

export default SkeletonLoader;
