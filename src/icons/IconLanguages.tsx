import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconArt = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42.29 38.45"
    className={className}
  >
    <path d="M22.82,25.14l-4.88-4.83,0-.06A33.69,33.69,0,0,0,25.13,7.7h5.63V3.84H17.3V0H13.46V3.84H0V7.67H21.47A30.13,30.13,0,0,1,15.38,18a30.09,30.09,0,0,1-4.44-6.44H7.09a33.89,33.89,0,0,0,5.73,8.77L3.05,30l2.72,2.72,9.61-9.61,6,6,1.46-3.91Zm10.82-9.76H29.8L21.15,38.45H25l2.16-5.77h9.14l2.16,5.77h3.84Zm-5,13.46,3.12-8.34,3.12,8.34Z" />
  </svg>
);

export default IconArt;
