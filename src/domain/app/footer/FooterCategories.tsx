import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import { Category } from '../../../common/types';
import useLocale from '../../../hooks/useLocale';
import scrollToTop from '../../../util/scrollToTop';
import {
  COURSE_DEFAULT_SEARCH_FILTERS,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../../eventSearch/constants';
import {
  getCourseCategoryOptions,
  getEventCategoryOptions,
  getSearchQuery,
} from '../../eventSearch/utils';
import { ROUTES } from '../routes/constants';
import styles from './footerCategories.module.scss';

const FooterCategories: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const { pathname } = useLocation();

  const isCoursesPage = pathname.startsWith(`/${locale}${ROUTES.COURSES}`);
  const defaultSearchFilters = isCoursesPage
    ? COURSE_DEFAULT_SEARCH_FILTERS
    : EVENT_DEFAULT_SEARCH_FILTERS;
  const searchPathname = `/${locale}${
    isCoursesPage ? ROUTES.COURSES : ROUTES.EVENTS
  }`;
  const pageType = isCoursesPage ? 'Course' : 'Event';

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      ...defaultSearchFilters,
      categories: [category.value],
    });

    push({ pathname: searchPathname, search });
    scrollToTop();
  };

  const getCategoryOptions = () => {
    if (isCoursesPage) {
      return getCourseCategoryOptions(t);
    }
    //default
    return getEventCategoryOptions(t);
  };

  const categories = getCategoryOptions();

  return (
    <div className={styles.topFooterWrapper}>
      <hr className={styles.divider} aria-hidden />
      <h2 className={styles.categoriesTitle}>
        {t(`footer.title${pageType}Categories`)}
      </h2>
      <div className={styles.categoriesInnerWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              key={category.value}
              hasHorizontalPadding={true}
              icon={category.icon}
              onClick={handleCategoryClick}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FooterCategories;
