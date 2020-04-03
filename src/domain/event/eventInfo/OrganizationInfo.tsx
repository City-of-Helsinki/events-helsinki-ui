import { IconSmile } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";

import Link from "../../../common/components/link/Link";
import LoadingSpinner from "../../../common/components/spinner/LoadingSpinner";
import {
  EventDetailsQuery,
  useOrganizationDetailsQuery
} from "../../../generated/graphql";
import useLocale from "../../../hooks/useLocale";
import getLocalisedString from "../../../util/getLocalisedString";
import styles from "./eventInfo.module.scss";

interface Props {
  eventData: EventDetailsQuery;
}

const OrganizationInfo: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { data: organizationData, loading } = useOrganizationDetailsQuery({
    skip: !eventData.eventDetails.publisher,
    ssr: false,
    variables: { id: eventData.eventDetails.publisher || "" }
  });

  const name = organizationData && organizationData.organizationDetails.name;
  const provider = getLocalisedString(
    eventData.eventDetails.provider || {},
    locale
  );

  const getSearchLink = () => {
    return `/${locale}/events?publisher=${eventData.eventDetails.publisher}`;
  };

  return (
    <div className={styles.infoWithIcon}>
      <div className={styles.iconWrapper}>
        <IconSmile className={styles.icon} />
      </div>
      <div className={styles.iconTextWrapper}>
        <h2 className={styles.title}>{t("event.info.labelOrganizer")}</h2>
        <LoadingSpinner hasPadding={false} isLoading={loading}>
          <>
            <div>{provider ? provider : name}</div>
          </>
          <Link to={getSearchLink()}>
            {t("event.info.linkSearchByOrganization")}
          </Link>
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default OrganizationInfo;
