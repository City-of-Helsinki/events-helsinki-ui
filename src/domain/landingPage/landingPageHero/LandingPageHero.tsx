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

  // We want to have event padding for the text wrapper. By using pure CSS we can set
  // max-width for the wrapper but when the text is longer that max-width the text
  // will take space of max-width and there might be wider right padding.
  // So we need to calculate the max-width of each text row and set max-width of
  // text wrapper to same
  const calculatedTextWrapperWidth = React.useMemo(() => {
    const getTextWrapperMaxWidth = () => {
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

    const getTextFontSize = () => {
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

    const maxTextWrapperWidth = getTextWrapperMaxWidth();

    // Return null if screen size is small or title is not defined
    if (!maxTextWrapperWidth || !title) {
      return null;
    }

    const font = `600 ${getTextFontSize()}px HelsinkiGrotesk`;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (context) {
      context.font = font;

      const words = title.trim().split(' ');
      let i = 0;
      let text = words[i];
      let maxTextWidth = 0;
      let prevTextWidth = 0;
      let textWidth = 0;

      // Loop through all the words
      while (i < words.length) {
        textWidth = context.measureText(text).width;

        if (textWidth <= maxTextWrapperWidth) {
          // Add new word to text if text width is smaller than max text wrapper width
          prevTextWidth = textWidth;
          i = i + 1;
          text = [text, words[i]].join(' ');
        } else {
          if (text === words[i]) {
            // If single word is longer than max text wrapper width compare
            // maxTextWidth and single word width
            maxTextWidth = Math.max(maxTextWidth, textWidth);
            i = i + 1;
          } else {
            maxTextWidth = Math.max(maxTextWidth, prevTextWidth);
          }
          text = words[i];
        }
      }

      return Math.ceil(maxTextWidth);
    }

    return null;
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
          style={{
            maxWidth: calculatedTextWrapperWidth
              ? calculatedTextWrapperWidth + 1
              : undefined,
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
