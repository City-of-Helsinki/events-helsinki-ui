import classNames from 'classnames';
import { Button } from 'hds-react';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { getLandingPageFields } from '../utils';
import styles from './landingPageHero.module.scss';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();

  const {
    backgroundColor,
    buttonText,
    buttonUrl,
    description,
    descriptionColor,
    heroBackgroundImage,
    heroBackgroundImageMobile,
    heroTopLayerImage,
    title,
    titleColor,
  } = getLandingPageFields(landingPage, locale);

  const moveToCollectionPage = () => {
    window.open(buttonUrl || '', '_self');
  };

  return (
    <div
      className={classNames(styles.landingPageHero, {
        [styles[`${backgroundColor}BackgroundColor`]]: backgroundColor,
      })}
    >
      <div
        className={styles.desktopBackgroundImage}
        style={{
          backgroundImage: `url(${heroBackgroundImage})`,
        }}
      ></div>
      <div
        className={styles.mobileBackgroundImage}
        style={{
          backgroundImage: `url(${heroBackgroundImageMobile})`,
        }}
      ></div>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${heroTopLayerImage})` }}
      ></div>
      <Container>
        <div className={styles.content}>
          <div
            className={styles.description}
            style={{ color: descriptionColor }}
          >
            {description}
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
