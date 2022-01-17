import { IconSpeechbubbleText } from 'hds-react';

import { EventTypeId } from '../../generated/graphql';
import IconCultureAndArts from '../../icons/IconCultureAndArts';
import IconDance from '../../icons/IconDance';
import IconFood from '../../icons/IconFood';
import IconMovies from '../../icons/IconMovies';
import IconMuseum from '../../icons/IconMuseum';
import IconMusic from '../../icons/IconMusic';
import IconSports from '../../icons/IconSports';
import IconTheatre from '../../icons/IconTheatre';
import IconTree from '../../icons/IconTree';
import { Filters, SearchCategoryOption } from './types';

// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_CATEGORIES {
  CULTURE = 'culture',
  DANCE = 'dance',
  FOOD = 'food',
  INFLUENCE = 'influence',
  MISC = 'misc',
  MOVIE = 'movie',
  MUSEUM = 'museum',
  MUSIC = 'music',
  NATURE = 'nature',
  SPORT = 'sport',
  THEATRE = 'theatre',
}

export const EVENT_DEFAULT_SEARCH_FILTERS: Filters = {
  categories: [],
  dateTypes: [],
  divisions: [],
  end: null,
  isFree: false,
  keyword: [],
  keywordNot: [],
  places: [],
  publisher: null,
  start: null,
  text: [],
  suitableFor: [],
};

export enum EVENT_SORT_OPTIONS {
  DURATION = 'duration',
  DURATION_DESC = '-duration',
  END_TIME = 'end_time',
  END_TIME_DESC = '-end_time',
  LAST_MODIFIED_TIME = 'last_modified_time',
  LAST_MODIFIED_TIME_DESC = '-last_modified_time',
  START_TIME = 'start_time',
  START_TIME_DESC = '-start_time',
}

export enum EVENT_SEARCH_FILTERS {
  CATEGORIES = 'categories',
  DATE_TYPES = 'dateTypes',
  DIVISIONS = 'divisions',
  END = 'end',
  IS_FREE = 'isFree',
  KEYWORD = 'keyword',
  KEYWORD_NOT = 'keywordNot',
  ONLY_CHILDREN_EVENTS = 'onlyChildrenEvents',
  ONLY_EVENING_EVENTS = 'onlyEveningEvents',
  ONLY_REMOTE_EVENTS = 'onlyRemoteEvents',
  PAGE = 'page',
  PLACES = 'places',
  PUBLISHER = 'publisher',
  START = 'start',
  TEXT = 'text',
  MIN_AGE = 'audienceMinAgeGt',
  MAX_AGE = 'audienceMaxAgeLt',
  SUITABLE = 'suitableFor',
}

export const CULTURE_KEYWORDS = [
  'kulke:33', // Teatteri
  'kulke:51', // Sirkus
  'kulke:205', // Elokuva ja media
  'kulke:351', // Teatteri ja sirkus
  'matko:teatteri', // teatteri
  'yso:p360', // cultural events
  'yso:p1235', // films
  'yso:p1278', // dance (performing arts)
  'yso:p1808', // music
  'yso:p2625', // in Finnish teatteritaide, "theatre arts"
  'yso:p2739', // fine arts
  'yso:p2850', // performing arts
  'yso:p2851', // art
  'yso:p4934', // museums
  'yso:p5121', // exhibitions
  'yso:p6889', // art exhibitions
  'yso:p7969', // literary art
  'yso:p8113', // literature
  'yso:p8144', // art museums
  'yso:p9592', // modern art
  'yso:p9593', // contemporary art
  'yso:p10105', // contemporary dance
  'yso:p16327', // cinema (art forms)
];

export const INFLUENCE_KEYWORDS = [
  'yso:p1657', // Vaikuttaminen
  'yso:p742', // Demokratia
  'yso:p5164', // Osallisuus
  'yso:p8268', // Kaavoitus
  'yso:p15882', // Asemakaavoitus
  'yso:p15292', // Kaupunkipolitiikka
];

export const MUSEUM_KEYWORDS = [
  'matko:museo', // Museo
  'yso:p4934', // Museot
];

export const SPORT_KEYWORDS = [
  'yso:p916', // Liikunta
  'yso:p965', // Urheilu
];

export const CAMPS_KEYWORDS = [
  'yso:p143', //leirit
  'yso:p21435', //kesäleirit
  'yso:p22818', //tiedeleirit
];

export const TRIPS_KEYWORDS = [
  'yso:p25261', //retket
  'yso:p1103', //retkeily
];

export const WORKSHOPS_KEYWORDS = [
  //työpajat
  'yso:p19245',
  'kulke:732',
];

export const MAPPED_EVENT_CATEGORIES: Record<string, string[]> = {
  [EVENT_CATEGORIES.CULTURE]: CULTURE_KEYWORDS,
  [EVENT_CATEGORIES.DANCE]: ['yso:p1278'],
  [EVENT_CATEGORIES.FOOD]: ['yso:p3670'],
  [EVENT_CATEGORIES.INFLUENCE]: INFLUENCE_KEYWORDS,
  [EVENT_CATEGORIES.MISC]: ['yso:p2108'],
  [EVENT_CATEGORIES.MOVIE]: ['yso:p1235'],
  [EVENT_CATEGORIES.MUSEUM]: MUSEUM_KEYWORDS,
  [EVENT_CATEGORIES.MUSIC]: ['yso:p1808'],
  [EVENT_CATEGORIES.NATURE]: ['yso:p2771'],
  [EVENT_CATEGORIES.SPORT]: SPORT_KEYWORDS,
  [EVENT_CATEGORIES.THEATRE]: ['yso:p2625'],
};

export const MAPPED_PLACES: Record<string, string> = {
  annantalo: 'tprek:7254',
  caisa: 'tprek:7256',
  espanlava: 'tprek:7265',
  kanneltalo: 'tprek:7255',
  malmitalo: 'tprek:8740',
  maunulatalo: 'tprek:56070',
  savoyteatteri: 'tprek:7258',
  stoa: 'tprek:7259',
  vuotalo: 'tprek:7260',
};

export const MARKETING_COLLECTION_SLUGS = ['talviloma'];

export const CATEGORY_CATALOG = {
  [EventTypeId.General]: {
    default: [
      EVENT_CATEGORIES.MOVIE,
      EVENT_CATEGORIES.MUSIC,
      EVENT_CATEGORIES.SPORT,
      EVENT_CATEGORIES.MUSEUM,
      EVENT_CATEGORIES.DANCE,
      EVENT_CATEGORIES.CULTURE,
      EVENT_CATEGORIES.NATURE,
      EVENT_CATEGORIES.INFLUENCE,
      EVENT_CATEGORIES.THEATRE,
      EVENT_CATEGORIES.FOOD,
    ],
  },
};

export const eventCategories: Record<EVENT_CATEGORIES, SearchCategoryOption> = {
  [EVENT_CATEGORIES.MOVIE]: {
    icon: <IconMovies />,
    labelKey: 'home.category.movie',
  },
  [EVENT_CATEGORIES.MUSIC]: {
    icon: <IconMusic />,
    labelKey: 'home.category.music',
  },
  [EVENT_CATEGORIES.SPORT]: {
    icon: <IconSports />,
    labelKey: 'home.category.sport',
  },
  [EVENT_CATEGORIES.MUSEUM]: {
    icon: <IconMuseum />,
    labelKey: 'home.category.museum',
  },
  [EVENT_CATEGORIES.DANCE]: {
    icon: <IconDance />,
    labelKey: 'home.category.dance',
  },
  [EVENT_CATEGORIES.CULTURE]: {
    icon: <IconCultureAndArts />,
    labelKey: 'home.category.culture',
  },
  [EVENT_CATEGORIES.NATURE]: {
    icon: <IconTree />,
    labelKey: 'home.category.nature',
  },
  [EVENT_CATEGORIES.INFLUENCE]: {
    icon: <IconSpeechbubbleText aria-hidden />,
    labelKey: 'home.category.influence',
  },
  [EVENT_CATEGORIES.THEATRE]: {
    icon: <IconTheatre />,
    labelKey: 'home.category.theatre',
  },
  [EVENT_CATEGORIES.FOOD]: {
    icon: <IconFood />,
    labelKey: 'home.category.food',
  },
  [EVENT_CATEGORIES.MISC]: {
    icon: <></>,
    labelKey: 'home.category.misc',
  },
};
