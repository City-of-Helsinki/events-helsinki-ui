import React from "react";

type Props = { className?: string };

export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 27 26"
    className={className}
  >
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g transform="translate(-785.000000, -171.000000)" stroke-width="2">
        <g transform="translate(773.000000, 129.000000)">
          <g transform="translate(13.000000, 43.000000)">
            <circle
              stroke="#000000"
              stroke-linecap="square"
              cx="17.6"
              cy="18.4"
              r="5.6"
            ></circle>
            <polyline
              stroke="#000000"
              stroke-linecap="square"
              points="17.6 16 17.6 18.4 20 18.4"
            ></polyline>
            <line
              x1="6.4"
              y1="0"
              x2="6.4"
              y2="3.2"
              id="Path"
              stroke="#444444"
              stroke-linecap="square"
            ></line>
            <line
              x1="17.6"
              y1="0"
              x2="17.6"
              y2="3.2"
              id="Path"
              stroke="#444444"
              stroke-linecap="square"
            ></line>
            <line
              x1="24"
              y1="8"
              x2="0"
              y2="8"
              id="Path"
              stroke="#000000"
            ></line>
            <polyline
              stroke="#000000"
              stroke-linecap="square"
              points="8.8 22.4 0 22.4 0 3.2 24 3.2 24 11.2"
            ></polyline>
          </g>
        </g>
      </g>
    </g>
  </svg>
);
