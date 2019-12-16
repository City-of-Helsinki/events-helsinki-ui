import React from "react";

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
export default ({ className = "" }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 32 32"
    className={className}
  >
    <g
      id="MVP-layouts"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      strokeLinecap="square"
    >
      <g
        id="Single-event"
        transform="translate(-1119.000000, -1426.000000)"
        stroke="#000"
        strokeWidth="2"
      >
        <g transform="translate(1120.000000, 1427.000000)">
          <ellipse
            id="Oval"
            cx="22"
            cy="16.2807018"
            rx="3"
            ry="3.05263158"
          ></ellipse>
          <path d="M30,16.7894737 C30,21.2854912 22,29 22,29 C22,29 14,21.2854912 14,16.7894737 C14,12.293682 17.581722,8.64912281 22,8.64912281 C26.418278,8.64912281 30,12.293682 30,16.7894737 L30,16.7894737 Z"></path>
          <path d="M11,5.59649123 C11,8.6872807 5.5,13.7368421 5.5,13.7368421 C5.5,13.7368421 0,8.6872807 0,5.59649123 C0,2.5056345 2.46243391,8.33942188e-08 5.5,8.33942188e-08 C8.53756609,8.33942188e-08 11,2.5056345 11,5.59649123 Z"></path>
          <ellipse
            id="Oval"
            cx="5.5"
            cy="5.59649123"
            rx="1.5"
            ry="1.52631579"
          ></ellipse>
          <path d="M13.5,25.9473684 C9.081722,25.9473684 5.5,22.3028092 5.5,17.8070175"></path>
        </g>
      </g>
    </g>
  </svg>
);
