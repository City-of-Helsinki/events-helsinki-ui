import { Footer } from 'hds-react';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import useLocale from '../../../hooks/useLocale';
import { isFeatureEnabled } from '../../../util/featureFlags';
import { resetFocusId } from '../resetFocus/ResetFocus';
import { ROUTES } from '../routes/constants';
import styles from './footer.module.scss';
import FooterCategories from './FooterCategories';

const FooterSection: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { pathname } = useLocation();

  // override Footer component default behaviour which focuses skip-link
  const handleBackToTop = () => {
    window?.scrollTo({ top: 0 });
    document.querySelector<HTMLDivElement>(`#${resetFocusId}`)?.focus();
  };

  const getCategoriesRoute = () => {
    return [ROUTES.COURSES, ROUTES.EVENTS].find((route) =>
      pathname.startsWith(`/${locale}${route}`)
    );
  };

  const categoriesRoute = getCategoriesRoute();

  return (
    <Footer title={t('appName')} className={styles.footer}>
      <Footer.Navigation>
        <Footer.Item
          as={Link}
          label={t('footer.searchEvents')}
          to={`/${locale}${ROUTES.EVENTS}`}
        />
        {isFeatureEnabled('EVENTS_HELSINKI_2') && (
          <Footer.Item
            as={Link}
            label={t('footer.searchHobbies')}
            to={`/${locale}${ROUTES.COURSES}`}
          />
        )}
        <Footer.Item
          as={Link}
          label={t('footer.searchCollections')}
          to={`/${locale}${ROUTES.COLLECTIONS}`}
        />
      </Footer.Navigation>
      {categoriesRoute && <FooterCategories route={categoriesRoute} />}
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
