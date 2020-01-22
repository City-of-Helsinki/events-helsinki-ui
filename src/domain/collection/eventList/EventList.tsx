import React from "react";

import Container from "../../app/layout/Container";
import styles from "./eventList.module.scss";

const EventList = () => {
  return (
    <div className={styles.eventList}>
      <Container>
        <h2>Kaikki syksyn parhaat tapahtumat</h2>
      </Container>
    </div>
  );
};

export default EventList;
