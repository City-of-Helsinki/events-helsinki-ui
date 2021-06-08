import classNames from 'classnames';
import { Notification } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useSessionStorage from 'react-use/lib/useSessionStorage';

import Container from '../../app/layout/Container';
import { EventType } from '../../event/types';
import ResultsInfoContainer from './ResultsInfo';
import styles from './searchResultList.module.scss';

interface Props {
  loading: boolean;
  eventsCount: number;
  eventList: React.ReactElement;
  eventType: EventType;
}

const SearchResultsContainer: React.FC<Props> = ({
  loading,
  eventsCount,
  eventList,
  eventType,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.searchResultListContainer}>
      <Container>
        <div className={classNames(styles.searchResultWrapper)}>
          {/* Temporary notification for Beta course search */}
          {eventType === 'course' && <BetaNotification />}
          <h2 className={styles.count}>
            {t('eventSearch.textFoundEvents', {
              count: eventsCount,
            })}
          </h2>
          {!!eventsCount && eventList}
          {!loading && (
            <ResultsInfoContainer
              resultsCount={eventsCount}
              eventType={eventType}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

const BetaNotification: React.FC = () => {
  const { t } = useTranslation();
  const [showBetaNotification, setShowBetaNotification] = useSessionStorage<
    boolean
  >('result-beta-notification', true);

  return showBetaNotification ? (
    <Notification
      type="info"
      className={styles.betaResultNotification}
      closeButtonLabelText={t('commons.notification.labelClose') as string}
      size="small"
      dismissible
      onClose={() => setShowBetaNotification(false)}
    >
      {t('courseSearch.betaResultsNotificationText')}
    </Notification>
  ) : null;
};

export default SearchResultsContainer;
