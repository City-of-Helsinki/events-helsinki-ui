import classNames from 'classnames';
import {
  Button,
  IconArrowRight,
  IconCake,
  IconGroup,
  IconHome,
  IconSearch,
} from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from '../../common/components/checkbox/Checkbox';
import DateSelector from '../../common/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../common/components/multiSelectDropdown/MultiSelectDropdown';
import RangeDropdown from '../../common/components/rangeDropdown/RangeDropdown';
import SearchAutosuggest from '../../common/components/search/SearchAutosuggest';
import { LinkedEventsSource } from '../../generated/graphql';
import IconRead from '../../icons/IconRead';
import Container from '../app/layout/Container';
import { ROUTES } from '../app/routes/constants';
import { EVENT_SEARCH_FILTERS } from '../eventSearch/constants';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import { useCourseSearch } from '../eventSearch/useSearch';
import PlaceSelector from '../place/placeSelector/PlaceSelector';
import styles from './search.module.scss';

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const Search: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const {
    handleSubmit,
    handleAutosuggestionClick,
    categoryInput,
    setCategoryInput,
    courseCategories,
    selectedCategories,
    setSelectedCategories,
    hobbyTypeInput,
    setHobbyTypeInput,
    hobbyTypes,
    selectedHobbyTypes,
    setSelectedHobbyTypes,
    selectedDateTypes,
    end,
    isCustomDate,
    handleChangeDateTypes,
    setEnd,
    setStart,
    start,
    toggleIsCustomDate,
    minAgeInput,
    maxAgeInput,
    handleSetAgeValues,
    placeInput,
    setSelectedPlaces,
    setPlaceInput,
    selectedPlaces,
    addSearchParameter,
    alsoOngoingCourses,
    isFree,
    clearFilters,
  } = useCourseSearch(scrollToResultList);

  const { t } = useTranslation();

  return (
    <div className={styles.searchContainer} data-testid={dataTestId}>
      <Container>
        <h1>{t('courseSearch.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            <div className={classNames(styles.gridRow, styles.autoSuggestRow)}>
              <div>
                <SearchAutosuggest
                  label={t(`courseSearch.search.labelSearchField`)}
                  helperText={t(`courseSearch.search.helperText`)}
                  onSubmit={handleAutosuggestionClick}
                />
              </div>
              <div>
                <MultiSelectDropdown
                  checkboxName="categoryOptions"
                  icon={<IconRead aria-hidden />}
                  inputValue={categoryInput}
                  name="category"
                  onChange={setSelectedCategories}
                  options={courseCategories}
                  setInputValue={setCategoryInput}
                  showSearch={false}
                  title={t('eventSearch.search.titleDropdownCategory')}
                  value={selectedCategories}
                />
              </div>
            </div>
            <div className={classNames(styles.gridRow)}>
              <div>
                <MultiSelectDropdown
                  checkboxName="hobbyTypeOptions"
                  icon={<IconGroup aria-hidden />}
                  inputValue={hobbyTypeInput}
                  name="hobbyType"
                  onChange={setSelectedHobbyTypes}
                  options={hobbyTypes}
                  setInputValue={setHobbyTypeInput}
                  showSearch={false}
                  title={t('courseSearch.search.titleDropdownHobbyType')}
                  value={selectedHobbyTypes}
                />
              </div>
              <div className={styles.dateSelectorWrapper}>
                <DateSelector
                  dateTypes={selectedDateTypes}
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
              <div>
                <RangeDropdown
                  checkboxName="ageLimitValues"
                  icon={<IconCake aria-hidden />}
                  rangeIcon={<IconArrowRight aria-hidden />}
                  minInputValue={minAgeInput}
                  minInputLabel={t('courseSearch.search.ageLimitMin')}
                  minInputStartValue={'0'}
                  minInputFixedValue={'18'}
                  maxInputValue={maxAgeInput}
                  maxInputLabel={t('courseSearch.search.ageLimitMax')}
                  maxInputEndValue={'99'}
                  name="ageLimitValues"
                  onChange={handleSetAgeValues}
                  fixedValuesText={t(
                    'courseSearch.search.showOnlyAdultCourses'
                  )}
                  title={t('courseSearch.search.ageLimitValues')}
                  value={[minAgeInput, maxAgeInput]}
                />
              </div>
              <div>
                <PlaceSelector
                  checkboxName="placesCheckboxes"
                  icon={<IconHome aria-hidden />}
                  inputValue={placeInput}
                  name="places"
                  onChange={setSelectedPlaces}
                  selectAllText={t('eventSearch.search.selectAllPlaces')}
                  setInputValue={setPlaceInput}
                  showSearch={true}
                  showSelectAll={true}
                  title={t('eventSearch.search.titleDropdownPlace')}
                  value={selectedPlaces}
                  source={LinkedEventsSource.Linkedcourses}
                />
              </div>
            </div>
            <div className={classNames(styles.gridRow)}>
              <div>
                <Checkbox
                  checked={alsoOngoingCourses}
                  id={EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES}
                  label={t('courseSearch.search.checkboxAlsoOngoingCourses')}
                  onChange={(e) =>
                    addSearchParameter(
                      e,
                      EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES
                    )
                  }
                />
              </div>
              <div>
                <Checkbox
                  className={styles.checkbox}
                  checked={isFree}
                  id={EVENT_SEARCH_FILTERS.IS_FREE}
                  label={t('courseSearch.search.checkboxIsFree')}
                  onChange={(e) =>
                    addSearchParameter(e, EVENT_SEARCH_FILTERS.IS_FREE)
                  }
                />
              </div>
              <div className={classNames(styles.searchButtonWrapper)}>
                <Button
                  fullWidth={true}
                  iconLeft={<IconSearch aria-hidden />}
                  variant="success"
                  type="submit"
                >
                  {t('eventSearch.search.buttonSearch')}
                </Button>
              </div>
            </div>
            <FilterSummary onClear={clearFilters} route={ROUTES.COURSES} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Search;
