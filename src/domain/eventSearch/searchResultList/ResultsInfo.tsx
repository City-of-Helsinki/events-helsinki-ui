import { Button, IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import styles from './resultsInfo.module.scss';

const ResultsInfoContainer: React.FC<{
  resultsCount: number;
}> = ({ resultsCount }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const isFinnish = locale === 'fi';

  const goToFinnishSearch = () => {
    history.push(`/fi${ROUTES.EVENTS}`);
  };

  const ActionButtons = () => (
    <>
      {!isFinnish && (
        <Button variant="success" onClick={goToFinnishSearch}>
          {t('eventSearch.searchNotification.buttons.labelSearchInFinnish')}
        </Button>
      )}
    </>
  );

  if (resultsCount === 0) {
    return (
      <ResultsInfo
        bigText={t(`eventSearch.searchNotification.noResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  if (resultsCount < 5) {
    return (
      <ResultsInfo
        bigText={t(`eventSearch.searchNotification.fewResultsTitle`)}
        actionsSection={<ActionButtons />}
      />
    );
  }

  return null;
};

const ResultsInfo: React.FC<{
  smallText?: string;
  bigText: string;
  actionsSection?: JSX.Element;
}> = ({ bigText, smallText, actionsSection }) => {
  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden />
      </div>
      <div className={styles.bigText}>{bigText}</div>
      {smallText && <div className={styles.smallText}>{smallText}</div>}
      {actionsSection && <div className={styles.actions}>{actionsSection}</div>}
    </div>
  );
};

export default ResultsInfoContainer;
