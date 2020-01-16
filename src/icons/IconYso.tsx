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
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-20.000000, -197.000000)">
        <g transform="translate(0.000000, 186.000000)">
          <g transform="translate(20.000000, 11.000000)">
            <polygon
              stroke="#000000"
              stroke-linecap="round"
              stroke-linejoin="round"
              points="0.75 0.75 10.5 0.75 23.25 13.5 13.5 23.25 0.75 10.5"
            ></polygon>
            <circle
              fill="#000000"
              fill-rule="nonzero"
              cx="6"
              cy="6"
              r="1.5"
            ></circle>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
