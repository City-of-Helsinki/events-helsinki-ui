import { Button, IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import CategoryFilter from '../../../common/components/category/CategoryFilter';
import DateSelector from '../../../common/components/dateSelector/DateSelector';
import Link from '../../../common/components/link/Link';
import MobileDateSelector from '../../../common/components/mobileDateSelector/MobileDateSelector';
import SearchAutosuggest from '../../../common/components/search/SearchAutosuggest';
import SearchLabel from '../../../common/components/search/searchLabel/SearchLabel';
import { AutosuggestMenuOption } from '../../../common/types';
import useLocale from '../../../hooks/useLocale';
import { ROUTES } from '../../app/routes/constants';
import { EVENT_DEFAULT_SEARCH_FILTERS } from '../../eventSearch/constants';
import {
  getEventCategoryOptions,
  getSearchQuery,
} from '../../eventSearch/utils';
import styles from './landingPageSearch.module.scss';

const Search: React.FC = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [dateTypes, setDateTypes] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const { push } = useHistory();

  const categories = getEventCategoryOptions(t);

  const handleChangeDateTypes = (value: string[]) => {
    setDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const goToSearchPage = (search: string) => {
    push({
      pathname: `/${locale}${ROUTES.EVENTS}`,
      search,
      state: { scrollToResults: true },
    });
  };

  const handleSubmit = () => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: autosuggestInput ? [autosuggestInput] : [],
    });

    goToSearchPage(search);
  };

  const handleMenuOptionClick = (option: AutosuggestMenuOption) => {
    const search = getSearchQuery({
      ...EVENT_DEFAULT_SEARCH_FILTERS,
      dateTypes,
      end,
      start,
      text: [option.text],
    });
    goToSearchPage(search);
  };

  return (
    <>
      <div className={styles.landingPageSearch}>
        {/* Hide Suprise me button on MVP version */}
        {/* <SupriseMeButton onClick={handleClickSupriseMe} /> */}
        <div className={styles.searchRow}>
          <div className={styles.titleWrapper}>
            <h2>{t('home.search.title')}</h2>
          </div>
          <div className={styles.autosuggestWrapper}>
            <SearchLabel htmlFor={'search'}>
              {t('home.search.labelSearchField')}
            </SearchLabel>
            <SearchAutosuggest
              name="search"
              onChangeSearchValue={setAutosuggestInput}
              onOptionClick={handleMenuOptionClick}
              placeholder={t('home.search.placeholder')}
              searchValue={autosuggestInput}
            />
          </div>
          <div className={styles.dateAndButtonWrapper}>
            <div className={styles.dateSelectorWrapper}>
              <SearchLabel color="black" htmlFor="date" srOnly={true}>
                {t('home.search.labelDateRange')}
              </SearchLabel>
              <div className={styles.desktopDateSelector}>
                <DateSelector
                  dateTypes={dateTypes}
                  endDate={end}
                  isCustomDate={isCustomDate}
                  name="date"
                  onChangeDateTypes={handleChangeDateTypes}
                  onChangeEndDate={setEnd}
                  onChangeStartDate={setStart}
                  startDate={start}
                  toggleIsCustomDate={toggleIsCustomDate}
                />
              </div>
              <MobileDateSelector
                dateTypes={dateTypes}
                endDate={end}
                name={'mobile_date'}
                onChangeDateTypes={handleChangeDateTypes}
                onChangeEndDate={setEnd}
                onChangeStartDate={setStart}
                startDate={start}
              />
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                fullWidth={true}
                iconLeft={<IconSearch />}
                onClick={handleSubmit}
                variant="success"
              >
                {t('home.search.buttonSearch')}
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.linkRow}>
          <Link color="white" size="small" to={`/${locale}${ROUTES.EVENTS}`}>
            {t('home.search.linkAdvancedSearch')}
          </Link>
        </div>
      </div>
      <div className={styles.categoriesWrapper}>
        {categories.map((category) => {
          return (
            <CategoryFilter
              href={`/${locale}${ROUTES.EVENTS}${getSearchQuery({
                ...EVENT_DEFAULT_SEARCH_FILTERS,
                categories: [category.value],
                dateTypes,
                end,
                start,
              })}`}
              key={category.value}
              icon={category.icon}
              text={category.text}
              value={category.value}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;
