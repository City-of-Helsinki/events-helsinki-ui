import classNames from 'classnames';
import { Button } from 'hds-react';
import capitalize from 'lodash/capitalize';
import React from 'react';

import Container from '../../../domain/app/layout/Container';
import { LandingPageFieldsFragment } from '../../../generated/graphql';
import useBreakpoint from '../../../hooks/useBreakpoint';
import useLocale from '../../../hooks/useLocale';
import { getLandingPageFields } from '../utils';
import styles from './landingPageHero.module.scss';

interface Props {
  landingPage: LandingPageFieldsFragment;
}

const LandingPageHero: React.FC<Props> = ({ landingPage }) => {
  const locale = useLocale();
  const breakpoint = useBreakpoint();

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

  const moveToCollectionPage = () => {
    window.open(buttonUrl || '', '_self');
  };

  const width = React.useMemo(() => {
    const getTextMaxWidth = (): number | undefined => {
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

    const getTextFontSize = (): number => {
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

    const maxTextWidth = getTextMaxWidth();

    if (!maxTextWidth || !title) {
      return undefined;
    }

    const font = `600 ${getTextFontSize()}px HelsinkiGrotesk`;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font;

      const textParts = title.trim().split(' ');
      let i = 0;
      let text = textParts[i];
      let maxWidth = 0;
      let prevWidth = 0;
      let width = 0;

      while (i < textParts.length) {
        width = context.measureText(text).width;

        if (width <= maxTextWidth) {
          prevWidth = width;
          i = i + 1;
          text = [text, textParts[i]].join(' ');
        } else {
          if (text === textParts[i]) {
            maxWidth = Math.max(maxWidth, width);
            i = i + 1;
          } else {
            maxWidth = Math.max(maxWidth, prevWidth);
          }
          text = textParts[i];
        }
      }

      const formattedWidth = Math.ceil(Math.max(maxWidth, width));
      return formattedWidth;
    } else {
      return undefined;
    }
  }, [breakpoint, title]);

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
          style={{ maxWidth: width ? width + 1 : undefined }}
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
