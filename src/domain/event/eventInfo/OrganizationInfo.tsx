import { IconFaceSmile, IconLayers } from 'hds-react';
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
import { getEventFields } from '../EventUtils';
import { EVENTS_ROUTE_MAPPER, EventType } from '../types';

interface Props {
  event: EventFieldsFragment;
  eventType: EventType;
}

const OrganizationInfo: React.FC<Props> = ({ event, eventType }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { provider, publisher } = getEventFields(event, locale);
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    ssr: false,
    variables: { id: publisher },
  });

  const organizationName = organizationData?.organizationDetails.name;

  const getSearchLink = () => {
    return `/${locale}${EVENTS_ROUTE_MAPPER[eventType]}?publisher=${publisher}`;
  };

  return (
    <>
      {provider && (
        <InfoWithIcon
          icon={<IconFaceSmile />}
          title={t('event.info.labelOrganizer')}
        >
          <div>{provider}</div>
        </InfoWithIcon>
      )}
      {publisher && (
        <InfoWithIcon
          icon={<IconLayers />}
          title={t('event.info.labelPublisher')}
        >
          <LoadingSpinner hasPadding={false} isLoading={loading}>
            {organizationName && (
              <>
                <div>{organizationName}</div>
                <Link to={getSearchLink()}>
                  {t(`${eventType}.info.linkSearchByPublisher`)}
                </Link>
              </>
            )}
          </LoadingSpinner>
        </InfoWithIcon>
      )}
    </>
  );
};

export default OrganizationInfo;
