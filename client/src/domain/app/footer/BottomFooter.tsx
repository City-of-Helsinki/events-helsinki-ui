import React from "react";
import { Link } from "react-router-dom";

import Container from "../layout/Container";
import styles from "./bottomFooter.module.scss";

const BottomFooter: React.FC = () => {
  return (
    <div className={styles.bottomFooter}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.linkContainer}>
            <Link to="about">Tietoa palvelusta</Link>
            <Link to="faq">Usein kysyttyä</Link>
            <Link to="feedback">Anna palautetta</Link>
          </div>
          <div className={styles.logoWrapper}>
            <div className={styles.helsinkiLogo}></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BottomFooter;
