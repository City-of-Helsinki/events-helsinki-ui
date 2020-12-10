import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import { Category } from '../../../common/types';
import useLocale from '../../../hooks/useLocale';
import scrollToTop from '../../../util/scrollToTop';
import { DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import { getCategoryOptions, getSearchQuery } from '../../eventSearch/utils';
import { ROUTES } from '../constants';
import styles from './footerCategories.module.scss';

const FooterCategories: FunctionComponent = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();

  const handleCategoryClick = (category: Category) => {
    const search = getSearchQuery({
      ...DEFAULT_SEARCH_FILTERS,
      categories: [category.value],
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToTop();
  };

  const categories = getCategoryOptions(t);

  return (
    <div className={styles.topFooterWrapper}>
      <hr className={styles.divider} aria-hidden />
      <h2 className={styles.categoriesTitle}>{t('footer.titleCategories')}</h2>
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
