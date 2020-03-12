import { Koros } from "hds-react";
import React, { FunctionComponent } from "react";

import Container from "../../../domain/app/layout/Container";
import Icon404 from "../../../icons/Icon404";
import styles from "./errorHero.module.scss";

interface Props {
  text: string;
  title: string;
}

const NotFound: FunctionComponent<Props> = ({ children, text, title }) => {
  return (
    <>
      <div className={styles.errorHero}>
        <Container>
          <Icon404 className={styles.icon} />
          <h1>{title}</h1>
          <p>{text}</p>
          <div className={styles.linkWrapper}>{children}</div>
        </Container>
      </div>
      <Koros className={styles.koros} flipHorizontal={true} type="pulse" />
    </>
  );
};

export default NotFound;
