import React from "react";
import { useHistory } from "react-router";

import Container from "../../../domain/app/layout/Container";
import useLocale from "../../../hooks/useLocale";
import Button from "../button/Button";
import styles from "./hero.module.scss";

interface Props {
  buttonText: string;
  subTitle: string;
  title: string;
}

// TODO: Integrate this component with CMS when implemented
const Hero: React.FC<Props> = ({ buttonText, subTitle, title }) => {
  const { push } = useHistory();
  const locale = useLocale();

  // TODO: Modify this function to use id from CMS
  const moveToCollectionPage = () => {
    push(`/${locale}/collection/5`);
  };
  return (
    <div className={styles.heroWrapper}>
      <div className={styles.heroImage}></div>
      <Container>
        <div className={styles.textWrapper}>
          <div className={styles.subTitle}>{subTitle}</div>
          <div className={styles.title}>{title}</div>
          <Button color="primary" onClick={moveToCollectionPage} size="default">
            {buttonText}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
