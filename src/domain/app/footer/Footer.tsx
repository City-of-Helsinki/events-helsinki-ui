import React, { FunctionComponent } from 'react';

import BottomFooter from './BottomFooter';
import TopFooter from './TopFooter';

const Footer: FunctionComponent = () => {
  return (
    <footer>
      <TopFooter />
      <BottomFooter />
    </footer>
  );
};

export default Footer;
