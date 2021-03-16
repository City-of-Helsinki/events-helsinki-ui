import { Footer, FooterCustomTheme } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import useLocale from '../../../hooks/useLocale';
import { resetFocusId } from '../resetFocus/ResetFocus';
import { ROUTES } from '../routes/constants';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';

const footerTheme = {
  '--footer-background': 'var(--color-engel-medium-light)',
} as FooterCustomTheme;

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { pathname } = useLocation();

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  const showCategories =
    pathname.startsWith(`/${locale}${ROUTES.COURSES}`) ||
    pathname.startsWith(`/${locale}${ROUTES.EVENTS}`);

  return (
    <Footer title={t('appName')} theme={footerTheme} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t('footer.searchEvents')}
          to={`/${locale}${ROUTES.EVENTS}`}
        />
        <Footer.Item
          as={Link}
          label={t('footer.searchHobbies')}
          to={`/${locale}${ROUTES.COURSES}`}
        />
        <Footer.Item
          as={Link}
          label={t('footer.searchCollections')}
          to={`/${locale}${ROUTES.COLLECTIONS}`}
        />
      </Footer.Navigation>
      {showCategories && <FooterCategories />}
      <Footer.Utilities
        backToTopLabel={t('footer.backToTop')}
        onBackToTopClick={handleBackToTop}
      >
        <Footer.Item
          as={'a'}
          href={t('footer.linkFeedbackUrl')}
          label={t('footer.linkFeedback')}
        />
      </Footer.Utilities>
      <Footer.Base
        copyrightHolder={t('footer.copyright')}
        copyrightText={t('footer.allRightsReserved')}
      >
        <Footer.Item
          as={Link}
          to={`/${locale}${ROUTES.ABOUT}`}
          label={t('footer.linkAbout')}
        />
        <Footer.Item
          as={Link}
          to={`/${locale}${ROUTES.ACCESSIBILITY}`}
          label={t('footer.linkAccessibility')}
        />
      </Footer.Base>
    </Footer>
  );
};

export default FooterSection;
