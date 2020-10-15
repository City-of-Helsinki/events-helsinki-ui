import classNames from 'classnames';
import { IconSearch, IconStar } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useLocation } from 'react-router-dom';

import IconLink from '../../../../common/components/link/IconLink';
import { getCurrentLanguage } from '../../../../common/translation/TranslationUtils';
import { SUPPORT_LANGUAGES } from '../../../../constants';
import useLocale from '../../../../hooks/useLocale';
import { Language } from '../../../../types';
import scrollToTop from '../../../../util/scrollToTop';
import { updateLocaleParam } from '../../../../util/updateLocaleParam';
import { ROUTES } from '../../constants';
import Container from '../../layout/Container';
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import styles from './navbar.module.scss';

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const locale = useLocale();

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map((language) => {
    return {
      label: t(`header.languages.${language}`),
      value: language,
    };
  });

  const handleChange = (newLanguage: Language) => {
    const currentLanguage = getCurrentLanguage(i18n);
    const pathname = updateLocaleParam(
      location.pathname,
      currentLanguage,
      newLanguage
    );

    i18n.changeLanguage(newLanguage);
    history.push({
      pathname,
      search: location.search,
    });
  };

  const logoLang = locale === 'sv' ? 'sv' : 'fi';

  return (
    <Container>
      <div className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <Link
            aria-label={t('header.ariaLabelLogo')}
            to={`/${locale}${ROUTES.HOME}`}
          >
            <div className={classNames(styles.logo, styles[logoLang])} />
            <div className={styles.appName}>{t('appName')}</div>
          </Link>
        </div>
        <div className={styles.links}>
          <IconLink
            icon={<IconSearch />}
            onClick={scrollToTop}
            text={t('header.searchEvents')}
            to={`/${locale}${ROUTES.EVENTS}`}
          />
          <IconLink
            icon={<IconStar />}
            onClick={scrollToTop}
            text={t('header.searchCollections')}
            to={`/${locale}${ROUTES.COLLECTIONS}`}
          />
        </div>
        <div className={styles.actions}>
          <LanguageDropdown
            languageOptions={languageOptions}
            onChange={handleChange}
            value={locale}
          />
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
