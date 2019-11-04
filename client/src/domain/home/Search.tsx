import React, { FunctionComponent } from "react";

import { ReactComponent as SearchIcon } from "../../assets/icons/svg/search.svg";
import Button, { ButtonStyles } from "../../common/components/button/Button";
import { formatMessage } from "../../common/translation/utils";
import styles from "./search.module.scss";

const SearchContainer: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.searchContainer}>
      <div>
        <h3>{formatMessage("home.search.title")}</h3>
      </div>
      <div>
        <label>{formatMessage("home.search.labelSearchField")}</label>
      </div>
      <div>
        <label>{formatMessage("home.search.labelDateRange")}</label>
      </div>
      <div>
        <Button
          buttonStyle={ButtonStyles.MEDIUM_PRIMARY}
          icon={<SearchIcon />}
          isBlock={true}
        >
          {formatMessage("home.search.buttonSearch")}
        </Button>
      </div>
    </div>
  );
};

export default SearchContainer;
