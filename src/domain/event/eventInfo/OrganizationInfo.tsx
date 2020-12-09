import { IconFaceSmile } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoWithIcon from '../../../common/components/infoWithIcon/InfoWithIcon';
import Link from '../../../common/components/link/Link';
import LoadingSpinner from '../../../common/components/spinner/LoadingSpinner';
import {
  EventFieldsFragment,
  useOrganizationDetailsQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import { EVENTS_ROUTE_MAPPER } from '../eventCard/types';
import { getEventFields } from '../EventUtils';
import { EventType } from '../types';

interface Props {
  event: EventFieldsFragment;
  eventType: EventType;
}

const OrganizationInfo: React.FC<Props> = ({ event, eventType }) => {
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
    return `/${locale}${EVENTS_ROUTE_MAPPER[eventType]}?publisher=${publisher}`;
  };

  return (
    <InfoWithIcon
      icon={<IconFaceSmile aria-hidden />}
      title={t('event.info.labelOrganizer')}
    >
      <LoadingSpinner hasPadding={false} isLoading={loading}>
        <div>{provider || organizationName}</div>
        {publisher && (
          <Link to={getSearchLink()}>
            {t('event.info.linkSearchByOrganization')}
          </Link>
        )}
      </LoadingSpinner>
    </InfoWithIcon>
  );
};

export default OrganizationInfo;
