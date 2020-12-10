import { Footer, FooterCustomTheme } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../constants';
import FooterCategories from './FooterCategories';
import styles from './footerCategories.module.scss';

const footerTheme = {
  '--footer-background': 'var(--color-engel-medium-light)',
} as FooterCustomTheme;

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  return (
    <Footer title={t('appName')} theme={footerTheme}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t('footer.searchEvents')}
          to={`/${locale}${ROUTES.EVENTS}`}
        />
        <Footer.Item
          as={Link}
          label={t('footer.searchCollections')}
          to={`/${locale}${ROUTES.COLLECTIONS}`}
        />
      </Footer.Navigation>
      <FooterCategories />
      <Footer.Utilities backToTopLabel={t('footer.backToTop')}>
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
