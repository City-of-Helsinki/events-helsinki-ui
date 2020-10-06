import { IconFaceSmile } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Link from '../../../common/components/link/Link';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  EventFieldsFragment,
  useOrganizationDetailsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/constants';
import { getEventFields } from '../EventUtils';
import styles from './eventInfo.module.scss';

interface Props {
  event: EventFieldsFragment;
}

const OrganizationInfo: React.FC<Props> = ({ event }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    skip: !!provider || !publisher,
    ssr: false,
    variables: { id: publisher },
  });

  const organizationName = organizationData?.organizationDetails.name;

  const getSearchLink = () => {
    return `/${locale}${ROUTES.EVENTS}?publisher=${publisher}`;
  };

  return (
    <div className={styles.infoWithIcon}>
      <div className={styles.iconWrapper}>
        <IconFaceSmile className={styles.icon} />
      </div>
      <div className={styles.iconTextWrapper}>
        <h2 className={styles.title}>{t('event.info.labelOrganizer')}</h2>
        <LoadingSpinner hasPadding={false} isLoading={loading}>
          <div>{provider || organizationName}</div>
          {publisher && (
            <Link to={getSearchLink()}>
              {t('event.info.linkSearchByOrganization')}
            </Link>
          )}
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default OrganizationInfo;
