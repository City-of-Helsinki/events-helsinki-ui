import React, { ReactElement } from 'react';

type Props = { className?: string };

// TODO: Import this icon from HDS when it's added there
const IconCraft = ({ className = '' }: Props): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42.27 42.06"
    className={className}
  >
    <defs>
      <style>{'.a{fill:none;}'}</style>
    </defs>
    <polygon
      className="a"
      points="16.65 18.75 3.67 5.71 3.67 16.9 16.65 18.75"
    />
    <polygon
      className="a"
      points="21.58 6.17 15.25 12.49 19.95 17.35 21.58 6.17"
    />
    <path className="a" d="M18.76,25.5,14.11,30l-8.4,8.36H16.88Z" />
    <polygon
      className="a"
      points="23.19 16.76 36.56 3.46 25.13 3.46 23.19 16.76"
    />
    <path className="a" d="M6.1,20.4,12.69,27l5-5Z" />
    <polygon
      className="a"
      points="20.39 35.95 27.02 29.33 22.09 24.25 20.39 35.95"
    />
    <polygon
      className="a"
      points="25.44 23.16 38.57 36.35 38.57 25.03 25.44 23.16"
    />
    <polygon
      className="a"
      points="24.55 19.88 35.99 21.51 29.54 15.04 24.55 19.88"
    />
    <path d="M41.29,3.15c.94-.94,1.16-1,.84-2.1-.41-.71-.41-.71-1.61-.71H23L12.83,10.49,3.36,1C2.42,0,2.32-.18,1.26.14.55.55.55.55.55,1.75V19.26l9.93,10L1,38.67c-.94.94-1.15,1-.83,2.1.41.71.41.71,1.61.71H19.26l10-10,9.58,9.63c.94.94,1,1.15,2.1.83.71-.41.71-.41.71-1.61V22.8l-10-10.06ZM23.19,16.76l1.94-13.3H36.56ZM21.58,6.17,20,17.35l-4.7-4.86ZM16.65,18.75l-13-1.85V5.71ZM6.1,20.4l11.58,1.65-5,5Zm8,9.6,4.65-4.5L16.88,38.36H5.71Zm6.28,6L22.1,24.24,27,29.33Zm5.05-12.79L38.57,25V36.35Zm-.89-3.28,5-4.84L36,21.51Z" />
  </svg>
);

export default IconCraft;
