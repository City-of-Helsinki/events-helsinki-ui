import React from "react";

import Button from "../../../common/components/button/Button";
import Container from "../../../domain/app/layout/Container";
import { LandingPage } from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import { getHeroBackgroundImage, getHeroTopLayerImage } from "../utils";
import styles from "./landingPageHero.module.scss";

interface Props {
  landingPage: LandingPage;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const title = getLocalisedString(landingPage.title || {}, locale);

  const subtitle = getLocalisedString(landingPage.description || {}, locale);

  const buttonText = getLocalisedString(landingPage.buttonText || {}, locale);

  const buttonUrl = getLocalisedString(landingPage.buttonUrl || {}, locale);

  const heroBackgroundImage = getHeroBackgroundImage(landingPage, locale);
  const heroTopLayerImage = getHeroTopLayerImage(landingPage, locale);

  const moveToCollectionPage = () => {
    window.open(buttonUrl, "_self");
  };

  return (
    <div
      className={styles.landingPageHero}
      style={{ backgroundImage: `url(${heroBackgroundImage})` }}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${heroTopLayerImage})` }}
      ></div>
      <Container>
        <div className={styles.content}>
          <div className={styles.subTitle}>{subtitle}</div>
          <h1 className={styles.title}>{title}</h1>
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
