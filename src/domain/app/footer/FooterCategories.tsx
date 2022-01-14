import capitalize from 'lodash/capitalize';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import useLocale from '../../../hooks/useLocale';
import { EventRouteProp } from '../../event/types';
import {
  CATEGORY_CATALOG,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../../eventSearch/constants';
import { CategoryExtendedOption } from '../../eventSearch/types';
import {
  getEventCategoryOptions,
  getSearchQuery,
} from '../../eventSearch/utils';
import styles from './footerCategories.module.scss';

interface FooterProps {
  route: EventRouteProp;
}

const FooterCategories: FunctionComponent<FooterProps> = ({ route }) => {
  const { t } = useTranslation();
  const locale = useLocale();

  const getCategoryLink = (category: CategoryExtendedOption) => {
    return `/${locale}${route}${getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      categories: [category.value],
    })}`;
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG.General.default
  );
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
