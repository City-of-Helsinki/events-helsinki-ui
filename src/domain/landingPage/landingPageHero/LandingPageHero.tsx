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

export const testIds = {
  content: 'landing-page-hero-content',
};

const getTextWrapperMaxWidth = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'md':
      return 400;
    case 'lg':
    case 'xlg':
      return 560;
  }
};

const getTextFontSize = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case 'lg':
    case 'xlg':
      return 80;
  }
  return 52;
};

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const textWrapper = React.useRef<HTMLDivElement>(null);
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
    title,
  });

  const handleButtonClick = () => {
    window.open(buttonUrl, '_self');
  };

  React.useLayoutEffect(() => {
    if (textWrapper.current) {
      textWrapper.current.style.maxWidth = textWrapperWidth
        ? `${textWrapperWidth + 1}px`
        : '';
      switch (titleAndDescriptionColor) {
        case 'BLACK':
          textWrapper.current.style.backgroundColor =
            'rgba(0255, 255, 255, 0.7)';
          break;
        case 'WHITE':
          textWrapper.current.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
          break;
      }
    }
  }, [textWrapperWidth, titleAndDescriptionColor]);

  return (
    <div
      className={classNames(styles.landingPageHero, {
        [styles[`${backgroundColor}BackgroundColor`]]: backgroundColor,
      })}
    >
      <div
        className={styles.desktopBackgroundImage}
        style={{
          backgroundImage: heroBackgroundImage && `url(${heroBackgroundImage})`,
        }}
      ></div>
      <div
        className={styles.mobileBackgroundImage}
        style={{
          backgroundImage:
            heroBackgroundImageMobile && `url(${heroBackgroundImageMobile})`,
        }}
      ></div>
      <div
        className={styles.image}
        style={{
          backgroundImage: heroTopLayerImage && `url(${heroTopLayerImage})`,
        }}
      ></div>
      <Container>
        <div
          ref={textWrapper}
          className={classNames(
            styles.content,
            styles[`color${capitalize(titleAndDescriptionColor)}`]
          )}
          data-testid={testIds.content}
        >
          <div className={styles.description}>{description}</div>
          <h1 className={styles.title}>{title}</h1>
          {!!buttonText && !!buttonUrl && (
            <Button onClick={handleButtonClick} variant="success">
              {buttonText}
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default LandingPageHero;
