import React from "react";

import { formatMessage } from "../../common/translation/TranslationUtils";
import logo from "../../logo.svg";
import Layout from "../app/layout/Layout";
import styles from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <header className={styles.homeHeader}>
          <img src={logo} className={styles.homeLogo} alt="logo" />
          <p>{formatMessage("home.text")}</p>
        </header>
      </div>
    </Layout>
  );
};

export default Home;
