import React from "react";

import MobileNavigation from "../../../common/components/mobileMenu/MobileMenu";
import MobileHeader from "./mobileHeader/MobileHeader";
import styles from "./mobileNavigation.module.scss";

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
      <MobileNavigation isMenuOpen={isMenuOpen} onClose={handleCloseMenu} />
    </div>
  );
};

export default HeaderMobile;
