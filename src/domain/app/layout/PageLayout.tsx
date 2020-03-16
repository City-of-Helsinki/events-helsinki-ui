import React, { FunctionComponent } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigation from "../mobileNavigation/MobileNavigation";
import styles from "./pageLayout.module.scss";

const PageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <MobileNavigation />

      <div className={styles.pageBody}>{children}</div>

      <Footer />
    </div>
  );
};

export default PageLayout;
