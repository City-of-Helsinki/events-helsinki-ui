import classNames from 'classnames';
import { IconSearch, IconStar } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { getCurrentLanguage } from '../../../../common/translation/TranslationUtils';
import { SUPPORT_LANGUAGES } from '../../../../constants';
import useLocale from '../../../../hooks/useLocale';
import scrollToTop from '../../../../util/scrollToTop';
import { translateValue } from '../../../../util/translateUtils';
import { updateLocaleParam } from '../../../../util/updateLocaleParam';
import { ROUTES } from '../../routes/constants';
import styles from './mobileMenu.module.scss';

export const mobileMenuDataId = 'mobile-menu';

interface MobileMenuContext {
  isMobileMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MobileMenuContext = React.createContext<MobileMenuContext>({
  isMobileMenuOpen: false,
  toggleMenu: () => null,
});

export const MobileMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMenu = React.useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  return (
    <MobileMenuContext.Provider
      value={{
        isMobileMenuOpen,
        toggleMenu,
      }}
    >
      {children}
    </MobileMenuContext.Provider>
  );
};

export const useMobileMenuContext = (): MobileMenuContext =>
  React.useContext(MobileMenuContext);

interface Props {
  isMenuOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<Props> = ({ isMenuOpen, onClose }) => {
  const { i18n, t } = useTranslation();
  const locale = useLocale();
  const location = useLocation();

  const currentLanguage = getCurrentLanguage(i18n);

  const getUrl = (newLanguage: string) => {
    const pathname = updateLocaleParam(
      location.pathname,
      currentLanguage,
      newLanguage
    );

    return `${pathname}${location.search}`;
  };

  const handleLinkClick = () => {
    onClose();
    scrollToTop();
  };

  const handleChangeLanguage = (language: string) => () => {
    i18n.changeLanguage(language);
    handleLinkClick();
  };

  const links = [
    {
      icon: <IconSearch />,
      text: t('header.searchEvents'),
      to: `/${locale}${ROUTES.EVENTS}`,
    },
    {
      icon: <IconStar />,
      text: t('header.searchCollections'),
      to: `/${locale}${ROUTES.COLLECTIONS}`,
    },
  ];

  return (
    <div
      aria-hidden={!isMenuOpen}
      className={classNames(styles.mobileMenu, {
        [styles.menuOpen]: isMenuOpen,
      })}
      data-testid={mobileMenuDataId}
      style={{ visibility: isMenuOpen ? undefined : 'hidden' }}
    >
      <div className={styles.linkWrapper}>
        <ul>
          {links.map((link, index) => {
            return (
              <li className={styles.link} key={index}>
                <Link onClick={handleLinkClick} to={link.to}>
                  {link.icon}
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.languageSelectWrapper}>
        <ul>
          {Object.values(SUPPORT_LANGUAGES).map((language) => {
            const lang = language.toLowerCase();

            return (
              <li
                key={language}
                className={classNames(styles.languageLink, {
                  [styles.isSelected]: currentLanguage === lang,
                })}
              >
                <Link
                  lang={lang}
                  onClick={handleChangeLanguage(lang)}
                  to={getUrl(lang)}
                >
                  {translateValue('header.languages.', lang, t)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
