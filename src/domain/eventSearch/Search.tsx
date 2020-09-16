import classNames from 'classnames';
import { Button, IconHome, IconLocation, IconSearch } from 'hds-react';
import uniq from 'lodash/uniq';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';

import Checkbox from '../../common/components/checkbox/Checkbox';
import DateSelector from '../../common/components/dateSelector/DateSelector';
import MultiSelectDropdown from '../../common/components/multiSelectDropdown/MultiSelectDropdown';
import SearchAutosuggest from '../../common/components/search/SearchAutosuggest';
import SearchLabel from '../../common/components/search/searchLabel/SearchLabel';
import { AutosuggestMenuOption } from '../../common/types';
import { CATEGORIES } from '../../constants';
import { useNeighborhoodListQuery } from '../../generated/graphql';
import useLocale from '../../hooks/useLocale';
import IconRead from '../../icons/IconRead';
import getLocalisedString from '../../util/getLocalisedString';
import { ROUTES } from '../app/constants';
import Container from '../app/layout/Container';
import PlaceSelector from '../place/placeSelector/PlaceSelector';
import { DEFAULT_SEARCH_FILTERS, EVENT_SEARCH_FILTERS } from './constants';
import FilterSummary from './filterSummary/FilterSummary';
import styles from './search.module.scss';
import { getSearchFilters, getSearchQuery } from './utils';

interface Props {
  scrollToResultList: () => void;
}

const Search: React.FC<Props> = ({ scrollToResultList }) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const { push } = useHistory();
  const { search } = useLocation();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search,
  ]);

  const [categoryInput, setCategoryInput] = React.useState('');
  const [divisionInput, setDivisionInput] = React.useState('');
  const [placeInput, setPlaceInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedDivisions, setSelectedDivisions] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [autosuggestInput, setAutosuggestInput] = React.useState('');

  const {
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    publisher,
  } = getSearchFilters(searchParams);

  const searchFilters = {
    categories: selectedCategories,
    dateTypes: selectedDateTypes,
    divisions: selectedDivisions,
    end,
    isFree,
    keyword,
    keywordNot,
    onlyChildrenEvents,
    onlyEveningEvents,
    places: selectedPlaces,
    publisher,
    start,
    text: selectedTexts,
  };

  const { data: neighborhoodsData } = useNeighborhoodListQuery();

  const divisionOptions = neighborhoodsData
    ? neighborhoodsData.neighborhoodList.data
        .map((neighborhood) => ({
          text: getLocalisedString(neighborhood.name, locale),
          value: neighborhood.id,
        }))
        .sort((a, b) => (a.text >= b.text ? 1 : -1))
    : [];

  const categories = [
    {
      text: t('home.category.movie'),
      value: CATEGORIES.MOVIE,
    },
    {
      text: t('home.category.music'),
      value: CATEGORIES.MUSIC,
    },
    {
      text: t('home.category.sport'),
      value: CATEGORIES.SPORT,
    },
    {
      text: t('home.category.museum'),
      value: CATEGORIES.MUSEUM,
    },
    {
      text: t('home.category.dance'),
      value: CATEGORIES.DANCE,
    },
    {
      text: t('home.category.culture'),
      value: CATEGORIES.CULTURE,
    },
    {
      text: t('home.category.nature'),
      value: CATEGORIES.NATURE,
    },
    {
      text: t('home.category.influence'),
      value: CATEGORIES.INFLUENCE,
    },
    {
      text: t('home.category.theatre'),
      value: CATEGORIES.THEATRE,
    },
    {
      text: t('home.category.food'),
      value: CATEGORIES.FOOD,
    },
    {
      text: t('home.category.misc'),
      value: CATEGORIES.MISC,
    },
  ];

  const handleChangeDateTypes = (value: string[]) => {
    setSelectedDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      text: uniq([...searchFilters.text, autosuggestInput]).filter(
        (text) => text
      ),
    };
    const search = getSearchQuery(filters);

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  // Initialize fields when page is loaded
  React.useEffect(() => {
    const {
      categories,
      dateTypes,
      divisions,
      end: endTime,
      places,
      start: startTime,
      text,
    } = getSearchFilters(searchParams);

    setSelectedCategories(categories);
    setSelectedDivisions(divisions);
    setSelectedPlaces(places);
    setSelectedTexts(text);
    setEnd(endTime);
    setStart(startTime);

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
  }, [searchParams]);

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

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
    scrollToResultList();
  };

  const handleOnlyChildrenEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      onlyChildrenEvents: e.target.checked,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const handleOnlyEveningEventChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      onlyEveningEvents: e.target.checked,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const handleIsFreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchQuery({
      ...searchFilters,
      isFree: e.target.checked,
    });

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });
  };

  const clearInputValues = () => {
    setCategoryInput('');
    setDivisionInput('');
    setPlaceInput('');
    setAutosuggestInput('');
  };

  const clearFilters = () => {
    const search = getSearchQuery(DEFAULT_SEARCH_FILTERS);

    push({ pathname: `/${locale}${ROUTES.EVENTS}`, search });

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

  return (
    <>
      <div className={styles.searchContainer}>
        <Container>
          <form onSubmit={handleSubmit}>
            <div className={styles.searchWrapper}>
              <div className={styles.rowWrapper}>
                <div className={classNames(styles.row, styles.autoSuggestRow)}>
                  <div>
                    <SearchLabel color="black" htmlFor="search">
                      {t('eventSearch.search.labelSearchField')}
                    </SearchLabel>
                    <SearchAutosuggest
                      name="search"
                      onChangeSearchValue={setAutosuggestInput}
                      onOptionClick={handleMenuOptionClick}
                      placeholder={t('eventSearch.search.placeholder')}
                      searchValue={autosuggestInput}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
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
                    />
                  </div>
                </div>
                <div className={styles.buttonWrapper}>
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
              <div className={styles.rowWrapper}>
                <div className={styles.row}>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={onlyChildrenEvents}
                      id={EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS}
                      label={t('eventSearch.search.checkboxOnlyChildrenEvents')}
                      onChange={handleOnlyChildrenEventChange}
                    />
                  </div>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={isFree}
                      id={EVENT_SEARCH_FILTERS.IS_FREE}
                      label={t('eventSearch.search.checkboxIsFree')}
                      onChange={handleIsFreeChange}
                    />
                  </div>
                  <div>
                    <Checkbox
                      className={styles.checkbox}
                      checked={onlyEveningEvents}
                      id={EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS}
                      label={t('eventSearch.search.checkboxOnlyEveningEvents')}
                      onChange={handleOnlyEveningEventChange}
                    />
                  </div>
                </div>
              </div>
              <FilterSummary onClear={clearFilters} />
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Search;
