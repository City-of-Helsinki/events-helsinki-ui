import classNames from 'classnames';
import { Button } from 'hds-react';
import capitalize from 'lodash/capitalize';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useBreakpoint from '../../../hooks/useBreakpoint';
import useLocale from '../../../hooks/useLocale';
import useTextWrapperWidth from '../../../hooks/useTextWrapperWidth';
import { Breakpoint } from '../../../types';
import { getLandingPageFields } from '../utils';
import styles from './landingPageHero.module.scss';

const getTextWrapperMaxWidth = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
      return undefined;
    case 'md':
      return 400;
    case 'lg':
    case 'xlg':
      return 560;
  }
};

const getTextFontSize = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'xs':
    case 'sm':
    case 'md':
      return 52;
    case 'lg':
    case 'xlg':
      return 80;
  }
};

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();
  const breakpoint = useBreakpoint();
  const { fontSize, maxTextWrapperWidth } = React.useMemo(
    () => ({
      fontSize: getTextFontSize(breakpoint),
      maxTextWrapperWidth: getTextWrapperMaxWidth(breakpoint),
    }),
    [breakpoint]
  );

  const {
    backgroundColor,
    buttonText,
    buttonUrl,
    description,
    heroBackgroundImage,
    heroBackgroundImageMobile,
    heroTopLayerImage,
    title,
    titleAndDescriptionColor,
  } = getLandingPageFields(landingPage, locale);

  const textWrapperWidth = useTextWrapperWidth({
    font: `600 ${fontSize}px HelsinkiGrotesk`,
    maxTextWrapperWidth,
    title: title || '',
  });

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
        <div
          className={classNames(
            styles.content,
            styles[`color${capitalize(titleAndDescriptionColor)}`]
          )}
          style={{
            maxWidth: textWrapperWidth ? textWrapperWidth + 1 : undefined,
          }}
        >
          <div className={styles.description}>{description}</div>
          <h1 className={styles.title}>{title}</h1>
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
