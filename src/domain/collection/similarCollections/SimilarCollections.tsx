import React from "react";

import Container from "../../app/layout/Container";
import styles from "./similarCollections.module.scss";

const SimilarCollections = () => {
  return (
    <div className={styles.similarCollections}>
      <Container>
        <h2>Katso myös nämä</h2>
      </Container>
    </div>
  );
};

export default SimilarCollections;
