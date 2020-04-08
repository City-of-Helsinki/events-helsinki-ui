import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import Checkbox from "../../../../common/components/input/Checkbox";
import useLocale from "../../../../hooks/useLocale";
import getUrlParamAsString from "../../../../util/getUrlParamAsString";
import { getSearchQuery } from "../../../../util/searchUtils";
import styles from "./extraFilters.module.scss";

const ExtraFilter: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();

  const searchParams = new URLSearchParams(useLocation().search);
  const publisher = searchParams.get("publisher");
  const categories = getUrlParamAsString(searchParams, "categories");
  const dateTypes = getUrlParamAsString(searchParams, "dateTypes");
  const districts = getUrlParamAsString(searchParams, "districts");
  const keywords = getUrlParamAsString(searchParams, "keywords");
  const places = getUrlParamAsString(searchParams, "places");
  const targets = getUrlParamAsString(searchParams, "targets");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const searchWord = searchParams.get("search") || "";
  const isFree = searchParams.get("isFree") === "true" ? true : false;

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      categories,
      dateTypes,
      districts,
      endDate: endDate ? new Date(endDate) : null,
      isFree: e.target.checked,
      keywords,
      places,
      publisher,
      search: searchWord,
      startDate: startDate ? new Date(startDate) : null,
      targets
    });

    console.log(search);
    push({ pathname: `/${locale}/events`, search });
  };

  return (
    <div className={styles.extraFilters}>
      <div className={styles.contentWrapper}>
        <h2 className={styles.title}>
          {t("eventSearch.filters.titleShowOnly")}
        </h2>
        <Checkbox
          checked={isFree}
          name={"isFree"}
          onChange={handleIsFreeChange}
        >
          {t("eventSearch.filters.checkboxIsFree")}
        </Checkbox>
      </div>
    </div>
  );
};

export default ExtraFilter;
