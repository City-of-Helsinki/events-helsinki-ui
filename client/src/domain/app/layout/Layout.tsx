import React, { FunctionComponent } from "react";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import Container from "./Container";
import styles from "./layout.module.scss";

const PageLayout: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.pageWrapper}>
      <Header />

      <div className={styles.pageBody}>
        <Container>{children}</Container>
      </div>

      <Footer />
    </div>
  );
};

export default PageLayout;
