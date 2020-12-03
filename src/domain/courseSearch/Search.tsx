import classNames from 'classnames';
import { Button, IconHome, IconLocation, IconSearch } from 'hds-react';
import { uniq } from 'lodash';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import Checkbox from '../../common/components/checkbox/Checkbox';
import DateSelector from '../../common/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../common/components/multiSelectDropdown/MultiSelectDropdown';
import SearchAutosuggest from '../../common/components/search/SearchAutosuggest';
import SearchLabel from '../../common/components/search/searchLabel/SearchLabel';
import { AutosuggestMenuOption } from '../../common/types';
import { LinkedEventsSource } from '../../generated/graphql';
import useDivisionOptions from '../../hooks/useDivisionOptions';
import useLocale from '../../hooks/useLocale';
import IconRead from '../../icons/IconRead';
import { ROUTES } from '../app/constants';
import Container from '../app/layout/Container';
import {
  DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
} from '../eventSearch/constants';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import { getCategoryOptions } from '../eventSearch/utils';
import PlaceSelector from '../place/placeSelector/PlaceSelector';
import styles from './search.module.scss';
import { getSearchFilters, getSearchQuery } from './utils';

interface Props {
  scrollToResultList?: () => void;
}

const Search: React.FC<Props> = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search,
  ]);

  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [categoryInput, setCategoryInput] = React.useState('');
  const [divisionInput, setDivisionInput] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [placeInput, setPlaceInput] = React.useState('');
  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedDivisions, setSelectedDivisions] = React.useState<string[]>(
    []
  );
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const divisionOptions = useDivisionOptions();

  const { alsoOngoingCourses } = getSearchFilters(searchParams);

  const searchFilters = {
    alsoOngoingCourses,
    categories: selectedCategories,
    dateTypes: selectedDateTypes,
    divisions: selectedDivisions,
    places: selectedPlaces,
    text: selectedTexts,
    start,
    end,
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      categories,
      dateTypes,
      divisions,
      places,
      text,
      end: endTime,
      start: startTime,
    } = getSearchFilters(searchParams);

    setSelectedCategories(categories);
    setSelectedDivisions(divisions);
    setSelectedPlaces(places);
    setSelectedTexts(text);
    setSelectedDateTypes(dateTypes);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
  }, [searchParams]);

  const clearInputValues = () => {
    setCategoryInput('');
    setDivisionInput('');
    setPlaceInput('');
    setAutosuggestInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(DEFAULT_SEARCH_FILTERS);

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });

    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();

    setAutosuggestInput('');
    // TODO: scroll
    // scrollToResultList();
  };

  const categories = getCategoryOptions(t);

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      text: uniq([...searchFilters.text, autosuggestInput]).filter(
        (text) => text
      ),
    };
    const search = getSearchQuery(filters);

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });
  };

  const handleChangeDateTypes = (value: string[]) => {
    setSelectedDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const handleAlsoOngoingCoursesEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      alsoOngoingCourses: e.target.checked,
    });

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });
  };

  const handleMenuOptionClick = async (option: AutosuggestMenuOption) => {
    const value = option.text;

    const { text } = getSearchFilters(searchParams);

    if (value && !text.includes(value)) {
      text.push(value);
    }

    const search = getSearchQuery({
      ...searchFilters,
      text,
    });

    setSelectedTexts(text);
    setAutosuggestInput('');

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });
    // TODO: handle scrolling
    // scrollToResultList();
  };

  return (
    <div className={styles.searchContainer}>
      <Container>
        <h1>{t('courseSearch.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.searchWrapper}>
            <div className={classNames(styles.gridRow, styles.autoSuggestRow)}>
              <div>
                <SearchLabel color="black" htmlFor="search">
                  {t('courseSearch.search.labelSearchField')}
                </SearchLabel>
                <SearchAutosuggest
                  name="search"
                  onChangeSearchValue={setAutosuggestInput}
                  onOptionClick={handleMenuOptionClick}
                  placeholder={t('courseSearch.search.placeholder')}
                  searchValue={autosuggestInput}
                />
              </div>
              <div>
                <MultiSelectDropdown
                  checkboxName="categoryOptions"
                  icon={<IconRead />}
                  inputValue={categoryInput}
                  name="category"
                  onChange={setSelectedCategories}
                  options={categories}
                  setInputValue={setCategoryInput}
                  showSearch={false}
                  title={t('eventSearch.search.titleDropdownCategory')}
                  value={selectedCategories}
                />
              </div>
            </div>
            <div className={classNames(styles.gridRow)}>
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
                  icon={<IconLocation />}
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
                  icon={<IconHome />}
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
                  onChange={handleAlsoOngoingCoursesEventChange}
                />
              </div>
              <div className={classNames(styles.searchButtonWrapper)}>
                <Button
                  fullWidth={true}
                  iconLeft={<IconSearch />}
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
