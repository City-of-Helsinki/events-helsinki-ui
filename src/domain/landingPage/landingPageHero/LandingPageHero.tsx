import { Button } from 'hds-react';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useIsSmallScreen from '../../../hooks/useIsSmallScreen';
import useLocale from '../../../hooks/useLocale';
import getLocalisedString from '../../../util/getLocalisedString';
import {
  getHeroBackgroundImage,
  getHeroBackgroundImageMobile,
  getHeroDescriptionColor,
  getHeroTitleColor,
  getHeroTopLayerImage,
} from '../utils';
import styles from './landingPageHero.module.scss';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();
  const isSmallScreen = useIsSmallScreen();

  const title = getLocalisedString(landingPage.title, locale);

  const titleColor = getHeroTitleColor(landingPage, locale);

  const subtitle = getLocalisedString(landingPage.description, locale);

  const descriptionColor = getHeroDescriptionColor(landingPage, locale);

  const buttonText = getLocalisedString(landingPage.buttonText, locale);

  const buttonUrl = getLocalisedString(landingPage.buttonUrl, locale);

  const heroBackgroundImage = getHeroBackgroundImage(landingPage, locale);
  const heroBackgroundImageMobile = getHeroBackgroundImageMobile(
    landingPage,
    locale
  );
  const heroTopLayerImage = getHeroTopLayerImage(landingPage, locale);

  const moveToCollectionPage = () => {
    window.open(buttonUrl, '_self');
  };

  return (
    <div
      className={styles.landingPageHero}
      style={{
        backgroundImage: `url(${
          isSmallScreen ? heroBackgroundImageMobile : heroBackgroundImage
        })`,
      }}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${heroTopLayerImage})` }}
      ></div>
      <Container>
        <div className={styles.content}>
          <div className={styles.subTitle} style={{ color: descriptionColor }}>
            {subtitle}
          </div>
          <h1 className={styles.title} style={{ color: titleColor }}>
            {title}
          </h1>
          {!!buttonText && !!buttonUrl && (
            <Button onClick={moveToCollectionPage} variant="success">
              {buttonText}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LandingPageHero;
