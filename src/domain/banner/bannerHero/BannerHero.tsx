import classNames from 'classnames';
import { Button } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import useBreakpoint from '../../../hooks/useBreakpoint';
import useLocale from '../../../hooks/useLocale';
import useTextWrapperWidth from '../../../hooks/useTextWrapperWidth';
import { isFeatureEnabled } from '../../../util/featureFlags';
import Container from '../../app/layout/Container';
import { contentBackgroundColorMap } from '../bannerConstants';
import {
  BannerHeroProps,
  getBannerContentTextFontSize,
  getBannerContentTextWrapperMaxWidth,
  getBannerFields,
  getTestIds,
} from '../bannerUtils';
import stylesNew from './bannerHero.module.scss';
import styles__DEPRECATED from './bannerHero__DEPRECATED.module.scss';

const BannerHero: React.FC<BannerHeroProps> = ({ banner, location }) => {
  const styles = isFeatureEnabled('EVENTS_HELSINKI_2')
    ? stylesNew
    : styles__DEPRECATED;
  const textWrapper = React.useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const breakpoint = useBreakpoint();
  const { t } = useTranslation();
  const { fontSize, maxTextWrapperWidth } = React.useMemo(
    () => ({
      fontSize: getBannerContentTextFontSize(breakpoint),
      maxTextWrapperWidth: getBannerContentTextWrapperMaxWidth(breakpoint),
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
    heroImageCredits,
  } = getBannerFields(locale, banner);

  const contentBackgroundColor =
    contentBackgroundColorMap[titleAndDescriptionColor];

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
      textWrapper.current.style.backgroundColor = contentBackgroundColor;
    }
  }, [contentBackgroundColor, textWrapperWidth, titleAndDescriptionColor]);

  const testIds = getTestIds(location);
  const titleAndDescriptionStyle = titleAndDescriptionColor
    ? styles[`color${capitalize(titleAndDescriptionColor)}`]
    : null;

  return (
    <div
      className={classNames(styles.bannerHero, {
        [styles[`${backgroundColor}BackgroundColor`]]: backgroundColor,
      })}
      data-testid={testIds.container}
    >
      <div
        className={styles.desktopBackgroundImage}
        data-testid={testIds.desktopBackgroundImage}
        style={{
          backgroundImage: heroBackgroundImage
            ? `url(${heroBackgroundImage})`
            : 'none',
        }}
      />
      <div
        className={styles.mobileBackgroundImage}
        data-testid={testIds.mobileBackgroundImage}
        style={{
          backgroundImage: heroBackgroundImageMobile
            ? `url(${heroBackgroundImageMobile})`
            : 'none',
        }}
      />
      {!!heroTopLayerImage && (
        <div
          className={styles.image}
          data-testid={testIds.heroTopLayerImage}
          style={{
            backgroundImage: `url(${heroTopLayerImage})`,
            // prettier-ignore
            backgroundPosition: `center calc(100% - ${location === 'top' ? 5.5 : 0}rem)`,
          }}
        />
      )}
      {!!heroImageCredits && (
        <div
          className={classNames(styles.imageCredits, titleAndDescriptionStyle)}
          style={{
            backgroundColor: contentBackgroundColor,
          }}
        >
          {t('commons.photographerText', { photographer: heroImageCredits })}
        </div>
      )}
      <Container>
        <div
          ref={textWrapper}
          className={classNames(styles.content, titleAndDescriptionStyle)}
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
