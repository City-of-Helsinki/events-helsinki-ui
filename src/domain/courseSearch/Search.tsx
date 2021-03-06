import classNames from 'classnames';
import {
  Button,
  IconArrowRight,
  IconCake,
  IconGroup,
  IconHome,
  IconLocation,
  IconSearch,
  Notification,
} from 'hds-react';
import uniq from 'lodash/uniq';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import Checkbox from '../../common/components/checkbox/Checkbox';
import DateSelector from '../../common/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../common/components/multiSelectDropdown/MultiSelectDropdown';
import RangeDropdown from '../../common/components/rangeDropdown/RangeDropdown';
import SearchAutosuggest from '../../common/components/search/SearchAutosuggest';
import SearchLabel from '../../common/components/search/searchLabel/SearchLabel';
import { AutosuggestMenuOption } from '../../common/types';
import { FEEDBACK_LINKS } from '../../constants';
import useDivisionOptions from '../../hooks/useDivisionOptions';
import useLocale from '../../hooks/useLocale';
import IconRead from '../../icons/IconRead';
import Container from '../app/layout/Container';
import { ROUTES } from '../app/routes/constants';
import {
  COURSE_DEFAULT_SEARCH_FILTERS,
  EVENT_SEARCH_FILTERS,
} from '../eventSearch/constants';
import FilterSummary from '../eventSearch/filterSummary/FilterSummary';
import {
  getCourseCategoryOptions,
  getCourseHobbyTypeOptions,
  getSearchFilters,
  getSearchQuery,
  MAX_AGE,
  MIN_AGE,
  normalizeSuitableFor,
} from '../eventSearch/utils';
import PlaceSelector from '../place/placeSelector/PlaceSelector';
import styles from './search.module.scss';

interface Props {
  scrollToResultList: () => void;
}

const Search: React.FC<Props> = ({ scrollToResultList }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const { search } = useLocation();
  const searchParams = React.useMemo(
    () => new URLSearchParams(search),
    [search]
  );

  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [categoryInput, setCategoryInput] = React.useState('');
  const [hobbyTypeInput, setHobbyTypeInput] = React.useState('');
  const [divisionInput, setDivisionInput] = React.useState('');
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedHobbyTypes, setSelectedHobbyTypes] = React.useState<string[]>(
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
  const [minAgeInput, setMinAgeInput] = React.useState('');
  const [maxAgeInput, setMaxAgeInput] = React.useState('');
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const divisionOptions = useDivisionOptions();

  const { alsoOngoingCourses, isFree } = getSearchFilters(searchParams);

  const suitableFor = normalizeSuitableFor([minAgeInput, maxAgeInput]);

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      categories,
      hobbyTypes,
      dateTypes,
      divisions,
      places,
      text,
      end: endTime,
      start: startTime,
      suitableFor: suitableForFilter,
    } = getSearchFilters(searchParams);

    setEnd(endTime);
    setStart(startTime);
    setSelectedCategories(categories);
    setSelectedHobbyTypes(hobbyTypes || []);
    setSelectedDivisions(divisions);
    setSelectedPlaces(places);
    setSelectedTexts(text);
    setSelectedDateTypes(dateTypes);
    if (suitableForFilter) {
      setMinAgeInput(suitableForFilter[0]?.toString() || '');
      setMaxAgeInput(suitableForFilter[1]?.toString() || '');
    }
    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
  }, [searchParams]);

  const searchFilters = {
    alsoOngoingCourses,
    categories: selectedCategories,
    hobbyTypes: selectedHobbyTypes,
    dateTypes: selectedDateTypes,
    divisions: selectedDivisions,
    isFree,
    places: selectedPlaces,
    text: selectedTexts,
    start,
    end,
    suitableFor,
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setHobbyTypeInput('');
    setDivisionInput('');
    setPlaceInput('');
    setAutosuggestInput('');
    setMinAgeInput('');
    setMaxAgeInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(COURSE_DEFAULT_SEARCH_FILTERS);

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });

    clearInputValues();
  };

  const handleSubmit = (event?: FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    moveToSearchPage();

    setAutosuggestInput('');
    scrollToResultList();
  };

  const categories = getCourseCategoryOptions(t);
  const hobbyTypes = getCourseHobbyTypeOptions(t);

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

  // Not working yet
  // const handleAlsoOngoingCoursesEventChange = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const search = getSearchQuery({
  //     ...searchFilters,
  //     alsoOngoingCourses: e.target.checked,
  //   });

  //   push({ pathname: `/${locale}${ROUTES.COURSES}`, search });
  // };

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
    scrollToResultList();
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      isFree: e.target.checked,
    });

    push({ pathname: `/${locale}${ROUTES.COURSES}`, search });
  };

  const handleSetAgeValues = (minAge: string, maxAge: string) => {
    setMinAgeInput(minAge);
    setMaxAgeInput(maxAge);
  };

  return (
    <div className={styles.searchContainer}>
      <Container>
        <SearchHeader />
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
                  icon={<IconRead aria-hidden />}
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
                <RangeDropdown
                  checkboxName="ageLimitValues"
                  icon={<IconCake aria-hidden />}
                  rangeIcon={<IconArrowRight aria-hidden />}
                  minInputValue={minAgeInput}
                  minInputLabel={t('courseSearch.search.ageLimitMin')}
                  minInputStartValue={MIN_AGE.toString()}
                  minInputFixedValue={'18'}
                  maxInputValue={maxAgeInput}
                  maxInputLabel={t('courseSearch.search.ageLimitMax')}
                  maxInputEndValue={MAX_AGE.toString()}
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
                />
              </div>
            </div>
            <div className={classNames(styles.gridRow)}>
              {/* Not working yet */}
              {/* <div>
                <Checkbox
                  checked={alsoOngoingCourses}
                  id={EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES}
                  label={t('courseSearch.search.checkboxAlsoOngoingCourses')}
                  onChange={handleAlsoOngoingCoursesEventChange}
                />
              </div> */}
              <div>
                <Checkbox
                  className={styles.checkbox}
                  checked={isFree}
                  id={EVENT_SEARCH_FILTERS.IS_FREE}
                  label={t('courseSearch.search.checkboxIsFree')}
                  onChange={handleIsFreeChange}
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

// Put to its own component because of temporary beta notifiction logic :)
const SearchHeader = () => {
  const { t } = useTranslation();
  const locale = useLocale();
  const [showBetaNotification, setShowBetaNotification] =
    React.useState<boolean>(false);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTextContainer}>
        <h1>{t('courseSearch.title')}</h1>
        <button
          onClick={() => setShowBetaNotification(true)}
          aria-label={t('courseSearch.betaButtonArialLabel')}
        >
          Beta
        </button>
      </div>
      <div>
        {showBetaNotification && (
          <Notification
            dismissible
            type="info"
            size="small"
            className={styles.betaNotification}
            closeButtonLabelText={
              t('commons.notification.labelClose') as string
            }
            onClose={() => setShowBetaNotification(false)}
          >
            <div
              dangerouslySetInnerHTML={{
                __html: t('courseSearch.betaNotificationText', {
                  openInNewTab: t('commons.srOnly.opensInANewTab'),
                  url: FEEDBACK_LINKS[locale],
                }),
              }}
            />
          </Notification>
        )}
      </div>
    </div>
  );
};

export default Search;
