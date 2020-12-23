import classNames from 'classnames';
import { Button } from 'hds-react';
import capitalize from 'lodash/capitalize';
import React from 'react';

import { BannerPage } from '../../../generated/graphql';
import useBreakpoint from '../../../hooks/useBreakpoint';
import useLocale from '../../../hooks/useLocale';
import useTextWrapperWidth from '../../../hooks/useTextWrapperWidth';
import { Breakpoint } from '../../../types';
import Container from '../../app/layout/Container';
import { getBannerFields } from '../bannerUtils';
import styles from './bannerHero.module.scss';

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
  banner: BannerPage;
}

const BannerHero: React.FC<Props> = ({ banner }) => {
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
  } = getBannerFields(locale, banner);

  const textWrapperWidth = useTextWrapperWidth({
    font: `600 ${fontSize}px HelsinkiGrotesk`,
    maxTextWrapperWidth,
    title: title as string,
  });

  const handleButtonClick = () => {
    window.open(buttonUrl as string, '_self');
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
      className={classNames(styles.bannerHero, {
        [styles[`${backgroundColor}BackgroundColor`]]: backgroundColor,
      })}
    >
      <div
        className={styles.desktopBackgroundImage}
        style={{
          backgroundImage: heroBackgroundImage
            ? `url(${heroBackgroundImage})`
            : 'none',
        }}
      />
      <div
        className={styles.mobileBackgroundImage}
        style={{
          backgroundImage: heroBackgroundImageMobile
            ? `url(${heroBackgroundImageMobile})`
            : 'none',
        }}
      />
      <div
        className={styles.image}
        style={{
          backgroundImage: heroTopLayerImage
            ? `url(${heroTopLayerImage})`
            : 'none',
        }}
      />
      <Container>
        <div
          ref={textWrapper}
          className={classNames(
            styles.content,
            titleAndDescriptionColor &&
              styles[`color${capitalize(titleAndDescriptionColor as string)}`]
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

export default BannerHero;
