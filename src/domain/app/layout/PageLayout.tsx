import classNames from "classnames";
import React, { FunctionComponent } from "react";

import { useMobileMenuContext } from "../../../common/components/mobileMenu/MobileMenu";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigation from "../mobileNavigation/MobileNavigation";
import styles from "./pageLayout.module.scss";

const PageLayout: FunctionComponent = ({ children }) => {
  const { isMobileMenuOpen } = useMobileMenuContext();
  return (
    <div className={styles.pageLayout}>
      <Header />
      <MobileNavigation />

      <div
        aria-hidden={isMobileMenuOpen}
        className={classNames(styles.pageBody, {
          [styles.mobileMenuOpen]: isMobileMenuOpen
        })}
      >
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
