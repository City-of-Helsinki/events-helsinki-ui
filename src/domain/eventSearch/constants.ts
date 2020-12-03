import { Filters } from './types';
// Page size of the event list
export const PAGE_SIZE = 10;

export enum CATEGORIES {
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

export const DEFAULT_SEARCH_FILTERS: Filters = {
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
  ALSO_ONGOING_COURSES = 'alsoOngoingCourses',
  ONLY_EVENING_EVENTS = 'onlyEveningEvents',
  PAGE = 'page',
  PLACES = 'places',
  PUBLISHER = 'publisher',
  START = 'start',
  TEXT = 'text',
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
  'yso:p10727', // Osallistuminen
];

export const MUSEUM_KEYWORDS = [
  'matko:museo', // Museo
  'yso:p4934', // Museot
];

export const SPORT_KEYWORDS = [
  'yso:p916', // Liikunta
  'yso:p965', // Urheilu
];

export const MAPPED_CATEGORIES: Record<string, string> = {
  [CATEGORIES.CULTURE]: CULTURE_KEYWORDS.join(','),
  [CATEGORIES.DANCE]: 'yso:p1278',
  [CATEGORIES.FOOD]: 'yso:p3670',
  [CATEGORIES.INFLUENCE]: INFLUENCE_KEYWORDS.join(','),
  [CATEGORIES.MISC]: 'yso:p2108',
  [CATEGORIES.MOVIE]: 'yso:p1235',
  [CATEGORIES.MUSEUM]: MUSEUM_KEYWORDS.join(','),
  [CATEGORIES.MUSIC]: 'yso:p1808',
  [CATEGORIES.NATURE]: 'yso:p2771',
  [CATEGORIES.SPORT]: SPORT_KEYWORDS.join(','),
  [CATEGORIES.THEATRE]: 'yso:p2625',
};

export const MAPPED_PLACES: Record<string, string> = {
  annantalo: 'tprek:7254',
  caisa: 'tprek:7256',
  espanlava: 'tprek:7265',
  kanneltalo: 'tprek:7255',
  savoyteatteri: 'tprek:7258',
  stoa: 'tprek:7259',
  vuotalo: 'tprek:7260',
  malmitalo: 'tprek:8740',
};
