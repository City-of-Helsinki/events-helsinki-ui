import classNames from 'classnames';
import { Button, IconHome, IconLocation, IconSearch } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import Checkbox from '../../common/components/checkbox/Checkbox';
import DateSelector from '../../common/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../common/components/multiSelectDropdown/MultiSelectDropdown';
import SearchAutosuggest from '../../common/components/search/SearchAutosuggest';
import IconRead from '../../icons/IconRead';
import Container from '../app/layout/Container';
import PlaceSelector from '../place/placeSelector/PlaceSelector';
import { EVENT_SEARCH_FILTERS } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import { useEventSearch } from './useSearch';

interface Props {
  scrollToResultList: () => void;
  'data-testid'?: string;
}

const Search: React.FC<Props> = ({
  scrollToResultList,
  'data-testid': dataTestId,
}) => {
  const { t } = useTranslation();

  const {
    handleSubmit,
    handleAutosuggestionClick,
    categoryInput,
    setCategoryInput,
    eventCategories,
    selectedCategories,
    setSelectedCategories,
    selectedDateTypes,
    end,
    isCustomDate,
    handleChangeDateTypes,
    setEnd,
    setStart,
    start,
    toggleIsCustomDate,
    divisionInput,
    setSelectedDivisions,
    divisionOptions,
    setDivisionInput,
    selectedDivisions,
    placeInput,
    setSelectedPlaces,
    setPlaceInput,
    selectedPlaces,
    addSearchParameter,
    isFree,
    onlyChildrenEvents,
    onlyEveningEvents,
    clearFilters,
  } = useEventSearch(scrollToResultList);

  return (
    <div className={styles.searchContainer} data-testid={dataTestId}>
      <Container>
        <h1>{t(`eventSearch.title`)}</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            <div className={styles.rowWrapper}>
              <div className={classNames(styles.row, styles.autoSuggestRow)}>
                <div>
                  <SearchAutosuggest
                    label={t(`eventSearch.search.labelSearchField`)}
                    helperText={t(`eventSearch.search.helperText`)}
                    onSubmit={handleAutosuggestionClick}
                  />
                </div>
              </div>
            </div>
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <MultiSelectDropdown
                    checkboxName="categoryOptions"
                    icon={<IconRead aria-hidden />}
                    inputValue={categoryInput}
                    name="category"
                    onChange={setSelectedCategories}
                    options={eventCategories}
                    setInputValue={setCategoryInput}
                    showSearch={false}
                    title={t('eventSearch.search.titleDropdownCategory')}
                    value={selectedCategories}
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
                  <MultiSelectDropdown
                    checkboxName="divisionOptions"
                    icon={<IconLocation aria-hidden />}
                    inputValue={divisionInput}
                    name="division"
                    onChange={setSelectedDivisions}
                    options={divisionOptions}
                    selectAllText={t('eventSearch.search.selectAllDivisions')}
                    setInputValue={setDivisionInput}
                    showSearch={true}
                    showSelectAll={true}
                    title={t('eventSearch.search.titleDropdownDivision')}
                    value={selectedDivisions}
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
                  />
                </div>
              </div>
              <div className={styles.buttonWrapper}>
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
            <div className={styles.rowWrapper}>
              <div className={styles.row}>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyChildrenEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                    label={t('eventSearch.search.checkboxOnlyChildrenEvents')}
                    onChange={(e) =>
                      addSearchParameter(
                        e,
                        EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS
                      )
                    }
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={isFree}
                    id={EVENT_SEARCH_FILTERS.IS_FREE}
                    label={t('eventSearch.search.checkboxIsFree')}
                    onChange={(e) =>
                      addSearchParameter(e, EVENT_SEARCH_FILTERS.IS_FREE)
                    }
                  />
                </div>
                <div>
                  <Checkbox
                    className={styles.checkbox}
                    checked={onlyEveningEvents}
                    id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                    label={t('eventSearch.search.checkboxOnlyEveningEvents')}
                    onChange={(e) =>
                      addSearchParameter(
                        e,
                        EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <FilterSummary onClear={clearFilters} />
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Search;
