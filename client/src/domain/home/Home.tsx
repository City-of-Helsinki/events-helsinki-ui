import React from "react";

import { formatMessage } from "../../common/translation/utils";
import logo from "../../logo.svg";
import styles from "./home.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <header className={styles.homeHeader}>
        <img src={logo} className={styles.homeLogo} alt="logo" />
        <p>{formatMessage("home.text")}</p>
      </header>
    </div>
  );
};

export default Home;
