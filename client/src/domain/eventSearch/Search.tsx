import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router";

import { ReactComponent as SearchIcon } from "../../assets/icons/svg/search.svg";
import Button from "../../common/components/button/Button";
import DateSelector from "../../common/components/dateSelector/DateSelector";
import getLocale from "../../util/getLocale";
import getUrlParamAsArray from "../../util/getUrlParamAsString";
import { getSearchQuery } from "../../util/searchUtils";
import Container from "../app/layout/Container";
import styles from "./search.module.scss";

const Search: FunctionComponent = () => {
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search
  ]);
  const { t } = useTranslation();
  const locale = getLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const { push } = useHistory();

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = () => {
    const search = getSearchQuery({
      categories: [],
      dateTypes,
      endDate,
      isCustomDate,
      publisher: null,
      search: "",
      startDate
    });

    push({ pathname: `/${locale}/events`, search });
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const end = searchParams.get("endDate");
    const start = searchParams.get("startDate");
    const dTypes = getUrlParamAsArray(searchParams, "dateTypes");

    if (end || start) {
      setIsCustomDate(true);

      if (end) {
        setEndDate(new Date(end));
      }
      if (start) {
        setStartDate(new Date(start));
      }
    } else {
      setDateTypes(dTypes);
    }
  }, [searchParams]);

  return (
    <>
      <div className={styles.searchContainer}>
        <Container>
          <div className={styles.secondRow}>
            <div></div>
            <div className={styles.dateSelectorWrapper}>
              <div className={styles.label}>
                {t("home.search.labelDateRange")}
              </div>
              <DateSelector
                dateTypes={dateTypes}
                endDate={endDate}
                isCustomDate={isCustomDate}
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEndDate}
                onChangeStartDate={setStartDate}
                startDate={startDate}
                toggleIsCustomDate={toggleIsCustomDate}
              />
            </div>
            <div></div>
            <div></div>
            <div className={styles.buttonWrapper}>
              <Button
                color="primary"
                fullWidth={true}
                iconLeft={<SearchIcon />}
                onClick={moveToSearchPage}
                size="default"
              >
                {t("home.search.buttonSearch")}
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Search;
