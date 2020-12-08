import classNames from 'classnames';
import { IconCross, IconMenuHamburger } from 'hds-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useLocale from '../../../../hooks/useLocale';
import { ROUTES } from '../../constants';
import Container from '../../layout/Container';
import styles from './mobileNavbar.module.scss';

interface Props {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onToggleMenu: () => void;
}

const MobileNavbar: React.FC<Props> = ({
  isMenuOpen,
  onCloseMenu,
  onToggleMenu,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const logoLang = locale === 'sv' ? 'sv' : 'fi';

  return (
    <Container>
      <div className={styles.mobileNavbar}>
        <Link
          aria-label={t('header.ariaLabelLogo')}
          onClick={onCloseMenu}
          to={`/${locale}${ROUTES.HOME}`}
          className={styles.logoWrapper}
        >
          <div className={classNames(styles.logo, styles[logoLang])} />
          <div className={styles.appName}>{t('appName')}</div>
        </Link>
        <div className={styles.buttonWrapper}>
          <button
            className={styles.menuButton}
            onClick={onToggleMenu}
            aria-label={
              isMenuOpen
                ? t('header.ariaButtonCloseMenu')
                : t('header.ariaButtonOpenMenu')
            }
          >
            {isMenuOpen ? <IconCross aria-hidden /> : <IconMenuHamburger aria-hidden />}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default MobileNavbar;
