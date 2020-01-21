import React from "react";

import Container from "../../app/layout/Container";
import styles from "./curratedEventList.module.scss";

const CurratedEventList = () => {
  return (
    <div className={styles.curratedEventList}>
      <Container>
        <h2>Käy ainakin näissä</h2>
      </Container>
    </div>
  );
};

export default CurratedEventList;
