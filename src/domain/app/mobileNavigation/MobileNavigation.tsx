import React from "react";

import MobileNavigation, {
  useMobileMenuContext
} from "../../../common/components/mobileMenu/MobileMenu";
import MobileHeader from "./mobileHeader/MobileHeader";
import styles from "./mobileNavigation.module.scss";

const HeaderMobile: React.FC = () => {
  const {
    closeMobileMenu,
    isMobileMenuOpen,
    openMobileMenu
  } = useMobileMenuContext();

  const disabledBodyScrolling = () => {
    const body = document.body;

    body.classList.add("scrollDisabledOnMobile");
  };

  const enableBodyScrolling = () => {
    const body = document.body;

    body.classList.remove("scrollDisabledOnMobile");
  };

  const handleCloseMenu = () => {
    closeMobileMenu();
    enableBodyScrolling();
  };

  const handleOpenMenu = () => {
    openMobileMenu();
    disabledBodyScrolling();
  };

  return (
    <div className={styles.mobileNavigation}>
      <MobileHeader
        isMenuOpen={isMobileMenuOpen}
        onCloseMenu={handleCloseMenu}
        onOpenMenu={handleOpenMenu}
      />
      <MobileNavigation
        isMenuOpen={isMobileMenuOpen}
        onClose={handleCloseMenu}
      />
    </div>
  );
};

export default HeaderMobile;
