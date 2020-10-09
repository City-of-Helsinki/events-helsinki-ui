import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../constants';
import Container from '../layout/Container';
import styles from './bottomFooter.module.scss';

const BottomFooter: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <div className={styles.bottomFooter}>
      <Container>
        <div className={styles.contentWrapper}>
          <div className={styles.linkContainer}>
            <Link to={`/${locale}${ROUTES.ABOUT}`}>
              {t('footer.linkAbout')}
            </Link>
            <Link to={`/${locale}${ROUTES.ACCESSIBILITY}`}>
              {t('footer.linkAccessibility')}
            </Link>
            <a href={t('footer.linkFeedbackUrl')}>{t('footer.linkFeedback')}</a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BottomFooter;
