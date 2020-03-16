import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ErrorHero from "../../common/components/error/ErrorHero";
import useLocale from "../../hooks/useLocale";

const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  return (
    <ErrorHero text={t("notFound.text")} title={t("notFound.title")}>
      <Link to={`/${locale}/events`}>{t("notFound.linkSearchEvents")}</Link>
    </ErrorHero>
  );
};

export default NotFound;