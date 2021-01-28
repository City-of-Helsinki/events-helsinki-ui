import { Filters } from './types';
// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_SEARCH_SOURCES {
  EVENTS = 'events',
  COURSES = 'courses',
}

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

//todo: to be replaced with valid values
export enum COURSE_CATEGORIES {
  MOVIE = 'movie',
}

//todo: to be replaced with valid values
export enum COURSE_HOBBY_TYPES {
  CLUBS = 'clubs',
  COURSES = 'courses',
  CAMPS = 'camps',
  TRIPS = 'trips',
  WORKSHOPS = 'workshops',
  ONLINE_STUDIES = 'online_studies',
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
};

export const COURSE_DEFAULT_SEARCH_FILTERS = {
  categories: [],
  hobbyTypes: [],
  dateTypes: [],
  divisions: [],
  end: null,
  isFree: false,
  alsoOngoingCourses: false,
  places: [],
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
  HOBBY_TYPES = 'hobbyTypes',
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
  MIN_AGE = 'audienceMinAgeGt',
  MAX_AGE = 'audienceMaxAgeLt',
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

export const MAPPED_EVENT_CATEGORIES: Record<string, string> = {
  [EVENT_CATEGORIES.CULTURE]: CULTURE_KEYWORDS.join(','),
  [EVENT_CATEGORIES.DANCE]: 'yso:p1278',
  [EVENT_CATEGORIES.FOOD]: 'yso:p3670',
  [EVENT_CATEGORIES.INFLUENCE]: INFLUENCE_KEYWORDS.join(','),
  [EVENT_CATEGORIES.MISC]: 'yso:p2108',
  [EVENT_CATEGORIES.MOVIE]: 'yso:p1235',
  [EVENT_CATEGORIES.MUSEUM]: MUSEUM_KEYWORDS.join(','),
  [EVENT_CATEGORIES.MUSIC]: 'yso:p1808',
  [EVENT_CATEGORIES.NATURE]: 'yso:p2771',
  [EVENT_CATEGORIES.SPORT]: SPORT_KEYWORDS.join(','),
  [EVENT_CATEGORIES.THEATRE]: 'yso:p2625',
};

//todo: replace with valid keyword ids
export const MAPPED_COURSE_CATEGORIES: Record<string, string> = {
  [EVENT_CATEGORIES.MOVIE]: 'yso:p1235',
};

export const MAPPED_CATEGORIES: Record<string, Record<string, string>> = {
  [EVENT_SEARCH_SOURCES.COURSES]: MAPPED_COURSE_CATEGORIES,
  [EVENT_SEARCH_SOURCES.EVENTS]: MAPPED_EVENT_CATEGORIES,
};

//todo: replace with valid keyword ids
export const MAPPED_COURSE_HOBBY_TYPES: Record<string, string> = {
  [COURSE_HOBBY_TYPES.CLUBS]: 'yso:p1235',
  [COURSE_HOBBY_TYPES.COURSES]: 'yso:p1235',
  [COURSE_HOBBY_TYPES.CAMPS]: 'yso:p1235',
  [COURSE_HOBBY_TYPES.TRIPS]: 'yso:p1235',
  [COURSE_HOBBY_TYPES.WORKSHOPS]: 'yso:p1235',
  [COURSE_HOBBY_TYPES.ONLINE_STUDIES]: 'yso:p1235',
};

export const MAPPED_KEYWORD_TERMS: Record<string, string> = {
  [EVENT_SEARCH_SOURCES.COURSES]: 'keyword_set_AND',
  [EVENT_SEARCH_SOURCES.EVENTS]: 'keywordOrSet1',
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
