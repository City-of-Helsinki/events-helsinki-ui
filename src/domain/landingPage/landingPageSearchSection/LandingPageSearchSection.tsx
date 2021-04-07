import classNames from 'classnames';
import { Button, IconMinus, IconPlus } from 'hds-react';
import capitalize from 'lodash/capitalize';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import SearchAutosuggest from '../../../common/components/search/SearchAutosuggest';
import WaveClipPath from '../../../common/components/waveClipPath/WaveClipPath';
import useLocale from '../../../hooks/useLocale';
import { EVENTS_ROUTE_MAPPER, EventType } from '../../event/types';
import {
  COURSE_HOBBY_TYPES,
  EVENT_DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
} from '../../eventSearch/constants';
import { CategoryExtendedOption } from '../../eventSearch/types';
import { getSearchQuery } from '../../eventSearch/utils';
import styles from './landingPageSearchSection.module.scss';

const buttonColor = 'black';

export type SearchProps = {
  title: string;
  searchHelperText: string;
  type: EventType;
  popularCategories: CategoryExtendedOption[];
};

export const popularCategoriesContainerTestId = 'popular-categories-container';

const Search: React.FC<SearchProps> = ({
  type,
  title,
  searchHelperText,
  popularCategories,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [categoriesVisibleMobile, setCategoriesVisibleMobile] = React.useState(
    false
  );
  const history = useHistory();

  const goToSearchPage = (search: string) => {
    history.push({
      pathname: `/${locale}${EVENTS_ROUTE_MAPPER[type]}`,
      search,
      state: { scrollToResults: true },
    });
  };

  const handleSubmit = (text: string) => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      text: [text],
    });
    goToSearchPage(search);
  };

  const handleCategoryClick = (category: CategoryExtendedOption) => {
    //categories are extended to have hobby types, which has a different search query parameter.
    const categoryParam = Object.values(COURSE_HOBBY_TYPES).includes(
      category.value as COURSE_HOBBY_TYPES
    )
      ? EVENT_SEARCH_FILTERS.HOBBY_TYPES
      : EVENT_SEARCH_FILTERS.CATEGORIES;
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      [categoryParam]: [category.value],
    });

    history.push({
      pathname: `/${locale}${EVENTS_ROUTE_MAPPER[type]}`,
      search,
      state: { scrollToResults: true },
    });
  };

  const toggleCategories = () => {
    setCategoriesVisibleMobile((categoriesVisible) => !categoriesVisible);
  };

  return (
    <div
      className={classNames(
        styles.landingPageSearchWrapper,
        styles[`type${capitalize(type)}`]
      )}
    >
      <div className={styles.landingPageSearch}>
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h2>{title}</h2>
          </div>
          <SearchAutosuggest
            onSubmit={handleSubmit}
            helperText={searchHelperText}
          />
        </div>
        <button
          className={styles.showCategoriesButton}
          onClick={toggleCategories}
          aria-expanded={categoriesVisibleMobile}
        >
          {categoriesVisibleMobile
            ? t('home.search.hidePopularCategories')
            : t('home.search.showPopularCategories')}
          <div className={styles.buttonIcon}>
            {categoriesVisibleMobile ? <IconMinus /> : <IconPlus />}
          </div>
        </button>
        <div
          data-testid={popularCategoriesContainerTestId}
          className={classNames(styles.popularCategories, {
            [styles.categoriesOpen]: categoriesVisibleMobile,
          })}
        >
          <p className={styles.categoriesTitle}>
            {t('home.search.popularCategories')}
          </p>
          <div className={styles.categoriesButtons}>
            {popularCategories.map((category) => (
              <Button
                key={category.value}
                variant="secondary"
                iconLeft={category.icon}
                onClick={() => handleCategoryClick(category)}
                style={{
                  color: buttonColor,
                  borderColor: buttonColor,
                  backgroundColor: 'transparent',
                }}
              >
                {category.text}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <WaveClipPath />
    </div>
  );
};

export default Search;
