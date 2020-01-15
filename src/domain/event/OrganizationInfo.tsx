import { IconAngleRight, IconSmile } from "hds-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import LoadingSpinner from "../../common/components/spinner/LoadingSpinner";
import {
  EventDetailsQuery,
  useOrganizationDetailsQuery
} from "../../generated/graphql";
import getLocale from "../../util/getLocale";
import getLocalisedString from "../../util/getLocalisedString";
import styles from "./eventInfo.module.scss";

interface Props {
  eventData: EventDetailsQuery;
}

const OrganizationInfo: React.FC<Props> = ({ eventData }) => {
  const { t } = useTranslation();
  const locale = getLocale();
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
        <p>{t("event.info.labelOrganizer")}</p>
        <LoadingSpinner isLoading={loading}>
          <>
            <div>{provider ? provider : name}</div>
          </>
          <Link className={styles.link} to={getSearchLink()}>
            {t("event.info.linkSearchByOrganization")}
            <IconAngleRight />
          </Link>
        </LoadingSpinner>
      </div>
    </div>
  );
};

export default OrganizationInfo;
