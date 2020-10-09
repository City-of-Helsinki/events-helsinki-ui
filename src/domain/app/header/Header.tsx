import React from 'react';

import styles from './header.module.scss';
import MobileNavigation from './mobileNavigation/MobileNavigation';
import Navbar from './navbar/Navbar';

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <Navbar />
      <MobileNavigation />
    </header>
  );
};

export default Header;
