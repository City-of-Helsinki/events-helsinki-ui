import React from "react";

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M11.9905843,1 L8.7985013,8.18485604 L1,9.03013322 L6.82418044,14.2980332 L5.21426319,22 L12.0080942,18.0692954 L18.8098542,21.9854148 L17.1857308,14.283448 L23,9.00593509 L15.2031506,8.18353012 L11.9905843,1 Z M8.67692331,13.692417 L4.93608746,10.3083249 L9.94721509,9.76535863 L11.9952096,5.15180263 L14.0603835,9.76668456 L19.062591,10.2950657 L15.3313361,13.6801522 L16.3746602,18.6294987 L12.0061119,16.1138875 L7.64218888,18.6381172 L8.67692331,13.692417 Z" />
    </g>
  </svg>
);
