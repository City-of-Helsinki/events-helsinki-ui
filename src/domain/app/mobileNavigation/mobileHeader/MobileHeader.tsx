import React from 'react';

import Container from '../../layout/Container';
import styles from './mobileHeader.module.scss';
import MobileNavbar from './mobileNavbar/MobileNavbar';

interface Props {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onOpenMenu: () => void;
}

const MobileHeader: React.FC<Props> = ({
  isMenuOpen,
  onCloseMenu,
  onOpenMenu,
}) => {
  return (
    <header className={styles.mobileHeaderWrapper}>
      <Container>
        <MobileNavbar
          isMenuOpen={isMenuOpen}
          onCloseMenu={onCloseMenu}
          onOpenMenu={onOpenMenu}
        />
      </Container>
    </header>
  );
};

export default MobileHeader;
