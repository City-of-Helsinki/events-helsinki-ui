import capitalize from 'lodash/capitalize';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import useLocale from '../../../hooks/useLocale';
import { EventRouteProp } from '../../event/types';
import {
  CATEGORY_CATALOG,
  COURSE_DEFAULT_SEARCH_FILTERS,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../../eventSearch/constants';
import { CategoryExtendedOption, Filters } from '../../eventSearch/types';
import {
  getCourseCategoryOptions,
  getEventCategoryOptions,
  getSearchQuery,
} from '../../eventSearch/utils';
import { ROUTES } from '../routes/constants';
import styles from './footerCategories.module.scss';

interface FooterProps {
  route: EventRouteProp;
}

const FooterCategories: FunctionComponent<FooterProps> = ({ route }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  // test
  const getCategoryLink = (category: CategoryOption) => {
    return `/${locale}${route}${getSearchQuery({
      ...defaultSearchFiltersMap[route],
      categories: [category.value],
    })}`;
  };

  const defaultSearchFiltersMap: Record<EventRouteProp, Filters> = {
    [ROUTES.EVENTS]: EVENT_DEFAULT_SEARCH_FILTERS,
    [ROUTES.COURSES]: COURSE_DEFAULT_SEARCH_FILTERS,
  };

  const categoriesOptionsMap: Record<EventRouteProp, CategoryExtendedOption[]> =
    {
      [ROUTES.EVENTS]: getEventCategoryOptions(
        t,
        CATEGORY_CATALOG.General.default
      ),
      [ROUTES.COURSES]: getCourseCategoryOptions(
        t,
        CATEGORY_CATALOG.Course.default
      ),
    };

  const categories = categoriesOptionsMap[route];
  const footerTitle = t(
    `footer.title${capitalize(route.substring(1))}Categories`
  );

  return (
    <div className={styles.topFooterWrapper}>
      <hr className={styles.divider} aria-hidden />
      <h2 className={styles.categoriesTitle}>{footerTitle}</h2>
      <div className={styles.categoriesInnerWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              href={getCategoryLink(category)}
              key={category.value}
              hasHorizontalPadding={true}
              icon={category.icon}
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
