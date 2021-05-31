import { Button, IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import { EVENTS_ROUTE_MAPPER, EventType } from '../../event/types';
import styles from './resultsInfo.module.scss';

const translationKeys: Record<EventType, string> = {
  event: 'eventSearch',
  course: 'courseSearch',
};

const ResultsInfoContainer: React.FC<{
  resultsCount: number;
  eventType: EventType;
}> = ({ resultsCount, eventType }) => {
  const { t } = useTranslation();
  const history = useHistory();
  const locale = useLocale();
  const isFinnish = locale === 'fi';
  const translationKey = translationKeys[eventType];

  const goToFinnishSearch = () => {
    history.push(`/fi${EVENTS_ROUTE_MAPPER[eventType]}`);
  };

  const goToOtherEventTypeSearch = () => {
    if (eventType === 'event') {
      history.push(`/${locale}${ROUTES.COURSES}`);
    } else if (eventType === 'course') {
      history.push(`/${locale}${ROUTES.EVENTS}`);
    }
  };

  const ActionButtons = () => (
    <>
      {!isFinnish && (
        <Button variant="success" onClick={goToFinnishSearch}>
          {t(
            `${translationKey}.searchNotification.buttons.labelSearchInFinnish`
          )}
        </Button>
      )}
      <Button
        className={isFinnish ? undefined : styles.secondaryButton}
        variant={isFinnish ? 'success' : 'secondary'}
        onClick={goToOtherEventTypeSearch}
      >
        {t(
          `${translationKey}.searchNotification.buttons.labelSearchOtherEventType`
        )}
      </Button>
    </>
  );

  if (resultsCount === 0) {
    return (
      <ResultsInfo
        bigText={t(`${translationKey}.searchNotification.noResultsTitle`)}
        smallText={
          isFinnish
            ? t(`${translationKey}.searchNotification.noResultsText`)
            : t(`${translationKey}.searchNotification.changeLanguageText`)
        }
        actionsSection={<ActionButtons />}
      />
    );
  }

  if (resultsCount < 5) {
    return (
      <ResultsInfo
        bigText={t(`${translationKey}.searchNotification.fewResultsTitle`)}
        smallText={
          isFinnish
            ? t(`${translationKey}.searchNotification.fewResultsText`)
            : t(`${translationKey}.searchNotification.changeLanguageText`)
        }
        actionsSection={<ActionButtons />}
      />
    );
  }

  return null;
};

const ResultsInfo: React.FC<{
  smallText?: string;
  bigText?: string;
  actionsSection?: JSX.Element;
}> = ({ bigText, smallText, actionsSection }) => {
  const { t } = useTranslation();
  bigText = bigText ?? t('eventSearch.noResultsInfo.bigText');
  smallText = smallText ?? t('eventSearch.noResultsInfo.smallText');

  return (
    <div className={styles.noResultsInfo}>
      <div className={styles.iconWrapper}>
        <IconSearch aria-hidden />
      </div>
      <div className={styles.bigText}>{bigText}</div>
      <div className={styles.smallText}>{smallText}</div>
      {actionsSection && <div className={styles.actions}>{actionsSection}</div>}
    </div>
  );
};

export default ResultsInfoContainer;
