import capitalize from 'lodash/capitalize';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import useLocale from '../../../hooks/useLocale';
import {
  CATEGORY_CATALOG,
  EVENT_DEFAULT_SEARCH_FILTERS,
} from '../../eventSearch/constants';
import { CategoryExtendedOption } from '../../eventSearch/types';
import {
  getEventCategoryOptions,
  getSearchQuery,
} from '../../eventSearch/utils';
import { ROUTES } from '../routes/constants';
import styles from './footerCategories.module.scss';

const FooterCategories: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();

  const getCategoryLink = (category: CategoryExtendedOption) => {
    return `/${locale}${ROUTES.EVENTS}${getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      categories: [category.value],
    })}`;
  };

  const categories = getEventCategoryOptions(
    t,
    CATEGORY_CATALOG.General.default
  );
  const footerTitle = t(
    `footer.title${capitalize(ROUTES.EVENTS.substring(1))}Categories`
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
