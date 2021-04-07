import uniq from 'lodash/uniq';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation, useParams } from 'react-router';

import useDivisionOptions from '../../hooks/useDivisionOptions';
import useLocale from '../../hooks/useLocale';
import { ROUTES } from '../app/routes/constants';
import { EventType } from '../event/types';
import {
  COURSE_DEFAULT_SEARCH_FILTERS,
  EVENT_DEFAULT_SEARCH_FILTERS,
  MAPPED_PLACES,
} from '../eventSearch/constants';
import { Filters } from '../eventSearch/types';
import {
  getCourseCategoryOptions,
  getCourseHobbyTypeOptions,
  getEventCategoryOptions,
  getSearchFilters,
  getSearchQuery,
} from '../eventSearch/utils';

const useSearch = (eventType: EventType, scrollToResultList: () => void) => {
  const isEvent = eventType === 'event';
  const locale = useLocale();
  const { push } = useHistory();
  const { search } = useLocation();
  const params = useParams<{ place?: string }>();
  const searchParams = React.useMemo(() => new URLSearchParams(search), [
    search,
  ]);

  const [autosuggestInput, setAutosuggestInput] = React.useState('');
  const [categoryInput, setCategoryInput] = React.useState('');
  const [divisionInput, setDivisionInput] = React.useState('');
  const [placeInput, setPlaceInput] = React.useState('');
  const [hobbyTypeInput, setHobbyTypeInput] = React.useState('');

  const [selectedDateTypes, setSelectedDateTypes] = React.useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    []
  );
  const [selectedPlaces, setSelectedPlaces] = React.useState<string[]>([]);
  const [start, setStart] = React.useState<Date | null>(null);
  const [end, setEnd] = React.useState<Date | null>(null);
  const [isCustomDate, setIsCustomDate] = React.useState<boolean>(false);
  const [selectedTexts, setSelectedTexts] = React.useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = React.useState<string[]>(
    []
  );
  const [minAgeInput, setMinAgeInput] = React.useState('');
  const [maxAgeInput, setMaxAgeInput] = React.useState('');
  const [selectedHobbyTypes, setSelectedHobbyTypes] = React.useState<string[]>(
    []
  );

  const divisionOptions = useDivisionOptions();

  const {
    alsoOngoingCourses,
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
    places: selectedPlaces,
    text: selectedTexts,
    start,
    end,
    isFree,
    ...(isEvent
      ? {
          keyword,
          keywordNot,
          onlyChildrenEvents,
          onlyEveningEvents,
          publisher,
        }
      : {
          alsoOngoingCourses,
          hobbyTypes: selectedHobbyTypes,
          audienceMinAgeGt: minAgeInput,
          audienceMaxAgeLt: maxAgeInput,
        }),
  };

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
      audienceMinAgeGt,
      audienceMaxAgeLt,
    } = getSearchFilters(searchParams);

    const pathPlace = params.place && MAPPED_PLACES[params.place.toLowerCase()];

    if (pathPlace) {
      places.push(pathPlace);
    }

    setEnd(endTime);
    setStart(startTime);
    setSelectedCategories(categories);
    setSelectedHobbyTypes(hobbyTypes || []);
    setSelectedDivisions(divisions);
    setSelectedPlaces(places);
    setSelectedTexts(text);
    setSelectedDateTypes(dateTypes);
    setMinAgeInput(audienceMinAgeGt || '');
    setMaxAgeInput(audienceMaxAgeLt || '');

    if (endTime || startTime) {
      setIsCustomDate(true);
    } else {
      setSelectedDateTypes(dateTypes);
    }
  }, [searchParams, params]);

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
    const search = getSearchQuery(
      isEvent ? EVENT_DEFAULT_SEARCH_FILTERS : COURSE_DEFAULT_SEARCH_FILTERS
    );

    push({
      pathname: `/${locale}${ROUTES[isEvent ? 'EVENTS' : 'COURSES']}`,
      search,
    });

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

  const handleAutosuggestionClick = async (suggestion: string) => {
    const { text } = getSearchFilters(searchParams);

    if (suggestion && !text.includes(suggestion)) {
      text.push(suggestion);
    }

    const search = getSearchQuery({
      ...searchFilters,
      text,
    });

    setSelectedTexts(text);
    setAutosuggestInput('');

    push({
      pathname: `/${locale}${ROUTES[isEvent ? 'EVENTS' : 'COURSES']}`,
      search,
    });
    scrollToResultList();
  };

  const { t } = useTranslation();
  const courseCategories = getCourseCategoryOptions(t);
  const eventCategories = getEventCategoryOptions(t);
  const hobbyTypes = getCourseHobbyTypeOptions(t);

  const moveToSearchPage = () => {
    const filters = {
      ...searchFilters,
      text: uniq([...searchFilters.text, autosuggestInput]).filter(
        (text) => text
      ),
    };
    const search = getSearchQuery(filters);

    push({
      pathname: `/${locale}${ROUTES[isEvent ? 'EVENTS' : 'COURSES']}`,
      search,
    });
  };

  const handleChangeDateTypes = (value: string[]) => {
    setSelectedDateTypes(value);
  };

  const toggleIsCustomDate = () => {
    setIsCustomDate(!isCustomDate);
  };

  const addSearchParameter = (
    e: React.ChangeEvent<HTMLInputElement>,
    filterType: keyof Filters
  ) => {
    const search = getSearchQuery({
      ...searchFilters,
      [filterType]: e.target.checked,
    });

    push({
      pathname: `/${locale}${ROUTES[isEvent ? 'EVENTS' : 'COURSES']}`,
      search,
    });
  };

  const handleSetAgeValues = (minAge: string, maxAge: string) => {
    setMinAgeInput(minAge);
    setMaxAgeInput(maxAge);
  };

  return {
    handleSubmit,
    handleAutosuggestionClick,
    categoryInput,
    setCategoryInput,
    courseCategories,
    eventCategories,
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
    divisionInput,
    setSelectedDivisions,
    divisionOptions,
    setDivisionInput,
    selectedDivisions,
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
    onlyChildrenEvents,
    onlyEveningEvents,
    clearFilters,
  };
};

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const useEventSearch = (scrollToResultList: () => void) =>
  useSearch('event', scrollToResultList);
export const useCourseSearch = (scrollToResultList: () => void) =>
  useSearch('course', scrollToResultList);
