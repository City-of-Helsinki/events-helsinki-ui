import React from "react";

import MobileHeader from "./mobileHeader/MobileHeader";
import styles from "./mobileNavigation.module.scss";
import MobileNavigationMenu from "./mobileNavigationMenu/MobileNavigationMenu";

const HeaderMobile: React.FC = () => {
  const [isMenuOpen, setIsmenuOpen] = React.useState(false);

  const disabledBodyScrolling = () => {
    const body = document.body;

    body.classList.add("scrollDisabledOnMobile");
  };

  const enableBodyScrolling = () => {
    const body = document.body;

    body.classList.remove("scrollDisabledOnMobile");
  };

  const handleCloseMenu = () => {
    setIsmenuOpen(false);
    enableBodyScrolling();
  };

  const handleOpenMenu = () => {
    setIsmenuOpen(true);
    disabledBodyScrolling();
  };

  return (
    <div className={styles.mobileNavigation}>
      <MobileHeader
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={handleOpenMenu}
      />
      <MobileNavigationMenu
        isMenuOpen={isMenuOpen}
        onMenuClose={handleCloseMenu}
      />
    </div>
  );
};

export default HeaderMobile;
