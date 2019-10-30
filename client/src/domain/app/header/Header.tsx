import React from "react";

import { formatMessage } from "../../../common/translation/utils";
import Container from "../layout/Container";
import styles from "./header.module.scss";

type Props = {};

function Header(props: Props) {
  return (
    <header className={styles.headerWrapper}>
      <Container>
        <div className={styles.navbarTop}>
          <div className={styles.logo}></div>
          <h1 className={styles.appName}>{formatMessage("appName")}</h1>
        </div>
      </Container>
    </header>
  );
}

export default Header;
