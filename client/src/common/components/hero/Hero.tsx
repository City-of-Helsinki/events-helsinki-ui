import React from "react";

import Button from "../../../common/components/button/Button";
import Container from "../../../domain/app/layout/Container";
import styles from "./hero.module.scss";

interface Props {
  buttonText: string;
  subTitle: string;
  title: string;
}

const Hero: React.FC<Props> = ({ buttonText, subTitle, title }) => {
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroImage}></div>
      <Container>
        <div className={styles.textWrapper}>
          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.title}>{title}</div>
          <Button
            color="primary"
            onClick={() => {
              alert("TODO: Katso vinkit");
            }}
            size="sm"
          >
            {buttonText}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
