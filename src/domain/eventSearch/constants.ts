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

export enum COURSE_CATEGORIES {
  MOVIE = 'movie',
  LANGUAGES = 'languages',
  LITERATURE = 'literature',
  ARTS_AND_CULTURE = 'arts_and_culture',
  VISUAL_ARTS = 'visual_arts',
  HANDICRAFTS = 'handicrafts',
  SPORT = 'sport',
  MUSIC = 'music',
  GAMES = 'games',
  FOOD = 'food',
  DANCE = 'dance',
  THEATRE = 'theatre',
}

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

//course hobby types
export const CLUBS_KEYWORDS = [
  'yso:p7642', // kerhot
  'yso:p7641', // kerhotoiminta
];

export const COURSES_KEYWORDS = [
  //kurssit, vapaa-ajan kurssit
  'yso:p9270',
  'kulke:301',
  'kulke:60',
  'kulke:625',
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

export const MOVIES_AND_MEDIA_COURSES_KEYWORDS = [
  'yso:p1235', //elokuva
  'kulke:29', //elokuvat
  'yso:p16327', //media
  'kulke:205', //mediataide
  'yso:p9731', //valokuva
  'kulke:87', //valokuvaus
  'yso:p1979', //?
];

export const LANGUAGES_COURSES_KEYWORDS = [
  'yso:p556', //kielet
  'yso:p38117', //kieltenopetus
];

export const LITERATURE_COURSES_KEYWORDS = [
  //sanataide, kirjallisuus, sarjakuva
  'yso:p8113',
  'yso:p7969',
  'kulke:81',
  'yso:p38773',
];

export const ARTS_AND_CULTURE_COURSES_KEYWORDS = [
  'yso:p2625',
  'yso:p27886',
  'yso:p2315',
  'yso:p16164',
  'yso:p9058',
  'kulke:51',
  'yso:p1235',
  'kulke:29',
  'yso:p16327',
  'kulke:205',
  'yso:p973',
  'yso:p2851',
  'yso:p1148',
  'yso:p38773',
  'yso:p695',
  'yso:p1808',
  'yso:p10871',
  'yso:p20421',
  'yso:p2969',
  'yso:p23171',
  'yso:p27962',
  'yso:p18718',
  'yso:p18434',
  'yso:p15521',
  'yso:p13408',
  'yso:p29932',
  'yso:p768',
  'yso:p2841',
  'yso:p6283',
  'yso:p1278',
  'yso:p10105',
  'yso:p3984',
  'yso:p25118',
  'yso:p10218',
  'yso:p21524',
  'yso:p37874',
  'yso:p1780',
];

export const VISUAL_ARTS_COURSES_KEYWORDS = [
  'kulke:81',
  'yso:p1148',
  'yso:p38773',
  'yso:p8883',
  'yso:p695',
];

export const HANDICRAFTS_COURSES_KEYWORDS = [
  'yso:p4923',
  'yso:p485',
  'kulke:668',
  'yso:p8630',
];

export const SPORT_COURSES_KEYWORDS = [
  'yso:p916',
  'kulke:710',
  'yso:p17018',
  'yso:p1963',
  'yso:p9824',
  'yso:p965',
  'yso:p6409',
  'yso:p8781',
  'yso:p26619',
  'yso:p13035',
  'yso:p2041',
];

export const MUSIC_COURSES_KEYWORDS = [
  'yso:p1808',
  'yso:p10871',
  'yso:p20421',
  'yso:p2969',
  'yso:p23171',
  'yso:p27962',
  'yso:p18718',
  'yso:p18434',
  'yso:p15521',
  'yso:p13408',
  'yso:p29932',
  'yso:p768',
  'yso:p2841',
];

export const GAMES_COURSES_KEYWORDS = [
  'yso:p6062',
  'yso:p2758',
  'yso:p21628',
  'yso:p17281',
  'yso:p22610',
  'yso:p4295',
  'yso:p7990',
];

export const FOOD_COURSES_KEYWORDS = ['yso:p367', 'yso:p5529', 'yso:p28276'];

export const DANCE_COURSES_KEYWORDS = [
  'yso:p6283',
  'yso:p1278',
  'yso:p10105',
  'yso:p3984',
  'yso:p25118',
  'yso:p10218',
  'yso:p21524',
  'yso:p37874',
];

export const THEATRE_COURSES_KEYWORDS = [
  'yso:p2625',
  'yso:p27886',
  'yso:p2315',
  'yso:p16164',
  'yso:p9058',
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
  [COURSE_CATEGORIES.MOVIE]: MOVIES_AND_MEDIA_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.LANGUAGES]: LANGUAGES_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.LITERATURE]: LITERATURE_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.ARTS_AND_CULTURE]: ARTS_AND_CULTURE_COURSES_KEYWORDS.join(
    ','
  ),
  [COURSE_CATEGORIES.VISUAL_ARTS]: VISUAL_ARTS_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.HANDICRAFTS]: HANDICRAFTS_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.SPORT]: SPORT_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.MUSIC]: MUSIC_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.GAMES]: GAMES_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.FOOD]: FOOD_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.DANCE]: DANCE_COURSES_KEYWORDS.join(','),
  [COURSE_CATEGORIES.THEATRE]: THEATRE_COURSES_KEYWORDS.join(','),
};

export const MAPPED_CATEGORIES: Record<string, Record<string, string>> = {
  [EVENT_SEARCH_SOURCES.COURSES]: MAPPED_COURSE_CATEGORIES,
  [EVENT_SEARCH_SOURCES.EVENTS]: MAPPED_EVENT_CATEGORIES,
};

export const MAPPED_COURSE_HOBBY_TYPES: Record<string, string> = {
  [COURSE_HOBBY_TYPES.CLUBS]: CLUBS_KEYWORDS.join(','),
  [COURSE_HOBBY_TYPES.COURSES]: COURSES_KEYWORDS.join(','),
  [COURSE_HOBBY_TYPES.CAMPS]: CAMPS_KEYWORDS.join(','),
  [COURSE_HOBBY_TYPES.TRIPS]: TRIPS_KEYWORDS.join(','),
  [COURSE_HOBBY_TYPES.WORKSHOPS]: WORKSHOPS_KEYWORDS.join(','),
};

export const MAPPED_KEYWORD_TERMS: Record<string, string> = {
  [EVENT_SEARCH_SOURCES.COURSES]: 'keywordOrSet2',
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
