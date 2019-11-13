import React, { FunctionComponent } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import MobileNavigation from "../mobileNavigation/MobileNavigation";
import Container from "./Container";
import styles from "./layout.module.scss";

const PageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <MobileNavigation />

      <div className={styles.pageBody}>
        <Container>{children}</Container>
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
