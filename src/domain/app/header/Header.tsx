import React from "react";

import Container from "../layout/Container";
import styles from "./header.module.scss";
import Navbar from "./navbar/Navbar";

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <Container>
        <Navbar />
      </Container>
    </header>
  );
};

export default Header;
