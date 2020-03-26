import React from "react";
import { useHistory } from "react-router";

import Button from "../../../common/components/button/Button";
import Container from "../../../domain/app/layout/Container";
import useLocale from "../../../hooks/useLocale";
import styles from "./landingPageHero.module.scss";

interface Props {
  buttonText: string;
  subTitle: string;
  title: string;
}

// TODO: Integrate this component with CMS when implemented
const LandingPageHero: React.FC<Props> = ({ buttonText, subTitle, title }) => {
  const { push } = useHistory();
  const locale = useLocale();

  // TODO: Modify this function to use id from CMS
  const moveToCollectionPage = () => {
    push(`/${locale}/collection/5`);
  };
  return (
    <div className={styles.landingPageHero}>
      <div className={styles.image}></div>
      <Container>
        <div className={styles.content}>
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

export default LandingPageHero;
