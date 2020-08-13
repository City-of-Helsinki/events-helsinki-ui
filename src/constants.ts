export const AUTOSUGGEST_KEYWORD_BLACK_LIST = [
  'kulke:354', // Seniorit
];

export const CATEGORIES = {
  CULTURE: 'culture',
  DANCE: 'dance',
  FOOD: 'food',
  INFLUENCE: 'influence',
  MISC: 'misc',
  MOVIE: 'movie',
  MUSEUM: 'museum',
  MUSIC: 'music',
  NATURE: 'nature',
  SPORT: 'sport',
  THEATRE: 'theatre',
};

export const DATE_TYPES = {
  ALL: 'all',
  THIS_WEEK: 'this_week',
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  WEEKEND: 'weekend',
};

export const EVENT_STATUS = {
  EVENT_CANCELLED: 'EventCancelled',
  EVENT_SCHEDULED: 'EventScheduled',
};

export enum AUTOSUGGEST_TYPES {
  KEYWORD = 'keyword',
  SEARCH = 'search',
}

export enum SUPPORT_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export enum DATE_PICKER_INPUT {
  START = 'start',
  END = 'end',
}

export enum DATE_PICKER_INPUT_STATE {
  NOT_SELECTED = 'not-selected',
  START_TIME_SELECTED = 'start-time-selected',
  END_TIME_SELECTED = 'end-time-selected',
}

export const DEFAULT_LANGUAGE = SUPPORT_LANGUAGES.FI;

export const DEFAULT_SOME_IMAGE = '/images/activities_SoMe-share.jpg';
