import React from "react";

import Button from "../../../common/components/button/Button";
import Container from "../../../domain/app/layout/Container";
import { LandingPageQuery } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import styles from "./landingPageHero.module.scss";

interface Props {
  landingPageData: LandingPageQuery;
}

const LandingPageHero: React.FC<Props> = ({ landingPageData }) => {
  const locale = useLocale();

  const title = getLocalisedString(
    landingPageData.landingPage.title || {},
    locale
  );

  const subtitle = getLocalisedString(
    landingPageData.landingPage.description || {},
    locale
  );

  const buttonText = getLocalisedString(
    landingPageData.landingPage.buttonText || {},
    locale
  );

  const buttonUrl = getLocalisedString(
    landingPageData.landingPage.buttonUrl || {},
    locale
  );

  const moveToCollectionPage = () => {
    window.open(buttonUrl, "_self");
  };

  return (
    <div className={styles.landingPageHero}>
      <div className={styles.image}></div>
      <Container>
        <div className={styles.content}>
          <div className={styles.subTitle}>{subtitle}</div>
          <div className={styles.title}>{title}</div>
          {!!buttonText && !!buttonUrl && (
            <Button
              color="primary"
              onClick={moveToCollectionPage}
              size="default"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LandingPageHero;
