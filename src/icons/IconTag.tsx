import React from "react";

type Props = { className?: string };

export default ({ className = "" }: Props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <g strokeWidth="1" fillRule="evenodd">
      {/* eslint-disable-next-line max-len */}
      <path d="M10.5,0.75 L23.25,13.5 L13.5,23.25 L0.75,10.5 L0.75,0.75 L10.5,0.75 Z M9.837,2.35 L2.35,2.35 L2.35,9.837 L13.5,20.987 L20.987,13.5 L9.837,2.35 Z M6.65,5 C7.56126984,5 8.3,5.73873016 8.3,6.65 C8.3,7.56126984 7.56126984,8.3 6.65,8.3 C5.73873016,8.3 5,7.56126984 5,6.65 C5,5.73873016 5.73873016,5 6.65,5 Z" />
    </g>
  </svg>
);
