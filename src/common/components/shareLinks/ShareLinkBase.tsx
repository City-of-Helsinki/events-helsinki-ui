import { stringify } from 'query-string';
import React, { ReactNode } from 'react';

import isClient from '../../../util/isClient';

interface Props {
  linkLabel: string;
  icon: ReactNode;
  url: string;
  queryParameters: { [key: string]: string };
  windowName: string;
}

const ShareLinkBase: React.FC<Props> = ({
  linkLabel,
  icon,
  url,
  queryParameters,
  windowName,
}) => {
  const href = url + '?' + stringify(queryParameters);

  const handleButtonClick = () => {
    if (isClient) {
      openWindow(window, href, windowName);
    }
  };

  return (
    // The link is actually a button, because we are opening a pop up  window
    // and for that reason won't make use of the href attribute.
    <button type="button" onClick={handleButtonClick} aria-label={linkLabel}>
      {icon}
    </button>
  );
};

// https://github.com/nygardk/react-share/blob/29fa4b957e0ebc7e089207cbc5b07c373c6fb4e0/src/ShareButton.tsx#L11
const getBoxPositionOnWindowCenter = (
  window: Window,
  height: number,
  width: number
) => ({
  left:
    window.outerWidth / 2 +
    (window.screenX || window.screenLeft || 0) -
    width / 2,
  top:
    window.outerHeight / 2 +
    (window.screenY || window.screenTop || 0) -
    height / 2,
});

function openWindow(window: Window, href: string, name: string) {
  const height = 400;
  const width = 550;
  const { left, top } = getBoxPositionOnWindowCenter(window, width, height);
  // https://github.com/nygardk/react-share/blob/29fa4b957e0ebc7e089207cbc5b07c373c6fb4e0/src/ShareButton.tsx#L26
  const config = {
    centerscreen: 'yes',
    chrome: 'yes',
    directories: 'no',
    height,
    left,
    location: 'no',
    menubar: 'no',
    resizable: 'no',
    scrollbars: 'yes',
    status: 'no',
    toolbar: 'no',
    top,
    width,
  };
  // A comma separated list of key value pairs without whitespace.
  // E.g. height=400,width=400
  const windowFeatures = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  window.open(href, name, windowFeatures);
}

export default ShareLinkBase;
