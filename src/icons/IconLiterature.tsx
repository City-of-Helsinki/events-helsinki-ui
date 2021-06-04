import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconLiterature = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 45.53 36.46"
    className={className}
  >
    <path d="M28.47,0a7.6,7.6,0,0,0-5.71,2.6A7.56,7.56,0,0,0,17.05,0H0V35.08H14.6c3.07,0,4.93.05,7.45,1.09l.71.29.72-.29c2.52-1,4.38-1.09,7.44-1.09H45.53V0ZM20.89,31.86a25.81,25.81,0,0,0-6.29-.53H3.75V3.75h13.3a3.84,3.84,0,0,1,3.84,3.84Zm20.89-.53H30.92a25.73,25.73,0,0,0-6.28.53V7.59a3.84,3.84,0,0,1,3.83-3.84H31.9V17.87l2-2,2,2V3.75h6Z" />
  </svg>
);

export default IconLiterature;
