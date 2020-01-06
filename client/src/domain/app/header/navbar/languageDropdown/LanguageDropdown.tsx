import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import Select from "../../../../../common/components/select/Select";
import { updateLocaleParam } from "../../../../../common/route/RouteUtils";
import { getCurrentLanguage } from "../../../../../common/translation/TranslationUtils";
import { SUPPORT_LANGUAGES } from "../../../../../constants";
import styles from "./languageDropdown.module.scss";

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const history = useHistory();
  const location = useLocation();

  const languageOptions = Object.values(SUPPORT_LANGUAGES).map(language => {
    return {
      label: language.toUpperCase(),
      value: language
    };
  });
  const currentLanguage = getCurrentLanguage(i18n);

  const handleChange = (newLanguage: string) => {
    i18n.changeLanguage(newLanguage);
    history.push({
      pathname: updateLocaleParam(
        location.pathname,
        currentLanguage,
        newLanguage
      ),
      search: location.search
    });
  };
  return (
    <div className={styles.languageDropdown}>
      <div className={styles.languageDropdownWrapper}>
        <Select
          onChange={handleChange}
          options={languageOptions}
          value={currentLanguage}
        />
      </div>
    </div>
  );
};

export default LanguageDropdown;
