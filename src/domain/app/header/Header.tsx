import React from 'react';

import Container from '../layout/Container';
import styles from './header.module.scss';
import MobileNavigation from './mobileNavigation/MobileNavigation';
import Navbar from './navbar/Navbar';

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <Container>
        <Navbar />
      </Container>
      <MobileNavigation />
    </header>
  );
};

export default Header;
