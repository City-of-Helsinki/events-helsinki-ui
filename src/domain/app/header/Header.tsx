import { Navigation } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { MAIN_CONTENT_ID, SUPPORT_LANGUAGES } from '../../../constants';
import useLocale from '../../../hooks/useLocale';
import { OptionType } from '../../../types';
import { isFeatureEnabled } from '../../../util/featureFlags';
import { skipFalsyType } from '../../../util/typescript.utils';
import { updateLocaleParam } from '../../../util/updateLocaleParam';
import { ROUTES } from '../routes/constants';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const languageOptions: OptionType[] = React.useMemo(() => {
    return Object.values(SUPPORT_LANGUAGES).map((language) => ({
      label: t(`header.languages.${language}`),
      value: language,
    }));
  }, [t]);

  const changeLanguage =
    (newLanguage: OptionType) =>
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      history.push({
        pathname: updateLocaleParam(
          location.pathname,
          locale,
          newLanguage.value
        ),
        search: location.search,
      });
    };

  const isTabActive = (pathname: string): boolean => {
    return location.pathname.startsWith(pathname);
  };

  const goToPage =
    (pathname: string) => (event?: React.MouseEvent<HTMLAnchorElement>) => {
      event?.preventDefault();
      history.push({ pathname });
      closeMenu();
    };

  const logoLang = locale === 'sv' ? 'sv' : 'fi';

  const navigationItems = [
    {
      label: t('header.searchEvents'),
      url: `/${locale}${ROUTES.EVENTS}`,
    },
    isFeatureEnabled('EVENTS_HELSINKI_2') && {
      label: t('header.searchHobbies'),
      url: `/${locale}${ROUTES.COURSES}`,
    },
    {
      label: t('header.searchCollections'),
      url: `/${locale}${ROUTES.COLLECTIONS}`,
    },
  ].filter(skipFalsyType);

  return (
    <Navigation
      menuOpen={menuOpen}
      onMenuToggle={toggleMenu}
      menuToggleAriaLabel={t('header.menuToggleAriaLabel')}
      skipTo={`#${MAIN_CONTENT_ID}`}
      skipToContentLabel={t('header.skipToContentLabel')}
      className={styles.navigation}
      onTitleClick={goToPage(`/${locale}${ROUTES.HOME}`)}
      logoLanguage={logoLang}
      titleAriaLabel={t('header.titleAriaLabel')}
    >
      <Navigation.Row variant="inline">
        {navigationItems.map((item, index) => (
          <Navigation.Item
            key={index}
            active={isTabActive(item.url)}
            className={styles.navigationItem}
            href={item.url}
            label={item.label}
            onClick={goToPage(item.url)}
          />
        ))}
      </Navigation.Row>
      <Navigation.Actions>
        <Navigation.LanguageSelector
          buttonAriaLabel={t('header.changeLanguage')}
          className={styles.languageSelector}
          label={t(`header.languages.${locale}`)}
        >
          {languageOptions.map((option) => (
            <Navigation.Item
              key={option.value}
              href="#"
              lang={option.value}
              label={option.label}
              onClick={changeLanguage(option)}
            />
          ))}
        </Navigation.LanguageSelector>
      </Navigation.Actions>
    </Navigation>
  );
};

export default Header;
