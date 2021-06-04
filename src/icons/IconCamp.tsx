import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconCamp = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 53.95 40.64"
    className={className}
  >
    <path d="M54,36.45H51.44L29.57,7l2.61-3.51L29.57,0,27,3.51,24.35,0l-2.6,3.52L24.35,7,2.48,36.45H0v4.19H54ZM27,10.54,46.22,36.45H39.1a14,14,0,0,1-10.78-8.33L26.53,24l-1.78,4.16A14,14,0,0,1,14,36.45H7.7Zm2.91,25.91H23.2a17.5,17.5,0,0,0,3.33-3.59A17.83,17.83,0,0,0,29.87,36.45Z" />
  </svg>
);

export default IconCamp;
