import { Filters } from './types';
// Page size of the event list
export const PAGE_SIZE = 10;

export enum EVENT_SEARCH_SOURCES {
  EVENTS = 'events',
  COURSES = 'courses',
}

export enum EVENT_CATEGORIES {
  MOVIE = 'movie',
  LANGUAGE = 'language',
  CULTURE = 'culture',
  CRAFTING = 'crafting',
  SPORT = 'sport',
  MUSIC = 'music',
  GAME = 'game',
  FOOD = 'food',
  DANCE = 'dance',
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
  MIN_AGE = 'minAge',
  MAX_AGE = 'maxAge',
}

export const MOVIE_KEYWORDS_FI = ['elokuva', 'elokuvat', 'media', 'mediataide'];

export const LANGUAGE_KEYWORDS_FI = ['kielet', 'kieltenopetus'];

export const CULTURE_KEYWORDS_FI = [
  'teatteri',
  'sirkus',
  'elokuva',
  'media',
  'kulttuuritapahtumat',
  'teatteritaide',
  'tanssi (esittävä taide)',
  'musiikki',
  'kuvataide',
  'esittävät taiteet',
  'taide',
  'museot',
  'näyttelyt',
  'taidenäyttelyt',
  'kirjallisuus',
  'sanataide',
  'taidemuseot',
  'nykytanssi',
  'nykytaide',
  'elokuvataide',
];

export const CRAFTING_KEYWORDS_FI = ['käsityö', 'käsityöt'];

export const SPORT_KEYWORDS_FI = [
  'liikunta',
  'urheilu',
  'perheliikunta',
  'ulkoliikunta',
  'liikuntapalvelut',
  'liikuntatapahtumat',
  'liikuntaharrastus',
  'urheilu- ja liikuntajärjestöt',
];

export const MUSIC_KEYWORDS_FI = [
  'musiikki',
  'konsertit',
  'popmusiikki',
  'jazz',
  'taidemusiikki',
  'populaarimusiikki',
  'ooppera',
  'musiikkiklubit',
  'lastenmusiikki',
  'elävä musiikki',
  'kuoromusiikki',
  'heavy metal',
  'kansanmusiikki',
  'joulumusiikki',
  'urkumusiikki',
];

export const GAME_KEYWORDS_FI = ['pelit', 'lautapelit'];

export const FOOD_KEYWORDS_FI = ['ruoka', 'katuruoka', 'ruokakulttuuri'];

export const DANCE_KEYWORDS_FI = ['tanssi', 'nykytanssi', 'tanssitapahtumat'];

export const THEATRE_KEYWORDS_FI = [
  'teatteritaide',
  'teatteritapahtumat',
  'lastenteatteri',
  'musiikkiteatteri',
  'nukketeatteri',
  'nukketeatterit',
  'kesäteatterit',
];

export const MAPPED_EVENT_CATEGORIES_FI: Record<string, string[]> = {
  [EVENT_CATEGORIES.MOVIE]: MOVIE_KEYWORDS_FI,
  [EVENT_CATEGORIES.LANGUAGE]: LANGUAGE_KEYWORDS_FI,
  [EVENT_CATEGORIES.CULTURE]: CULTURE_KEYWORDS_FI,
  [EVENT_CATEGORIES.CRAFTING]: CRAFTING_KEYWORDS_FI,
  [EVENT_CATEGORIES.SPORT]: SPORT_KEYWORDS_FI,
  [EVENT_CATEGORIES.MUSIC]: MUSIC_KEYWORDS_FI,
  [EVENT_CATEGORIES.GAME]: GAME_KEYWORDS_FI,
  [EVENT_CATEGORIES.FOOD]: FOOD_KEYWORDS_FI,
  [EVENT_CATEGORIES.DANCE]: DANCE_KEYWORDS_FI,
  [EVENT_CATEGORIES.THEATRE]: THEATRE_KEYWORDS_FI,
};

export const MAPPED_CATEGORIES: Record<string, Record<string, string[]>> = {
  FI: MAPPED_EVENT_CATEGORIES_FI,
  //todo: fix after demo
  SE: MAPPED_EVENT_CATEGORIES_FI,
  EN: MAPPED_EVENT_CATEGORIES_FI,
};

//todo: replace with valid keyword ids
export const MAPPED_COURSE_CATEGORIES: Record<string, string> = {
  [EVENT_CATEGORIES.MOVIE]: 'yso:p1235',
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
