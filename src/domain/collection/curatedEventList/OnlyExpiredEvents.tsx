import React from "react";
import { useTranslation } from "react-i18next";

import Link from "../../../common/components/link/Link";
import useLocale from "../../../hooks/useLocale";

const OnlyExpiredEvents = () => {
  const locale = useLocale();
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("collection.curatedEvents.textOnlyExpiredEvents")}</p>
      <Link to={`/${locale}/collections`}>
        {t("collection.curatedEvents.linkOnlyExpiredEvents")}
      </Link>
    </div>
  );
};
export default OnlyExpiredEvents;
