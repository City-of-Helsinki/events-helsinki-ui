export const BREAKPOINTS = {
  XS: 576,
  SM: 768,
  MD: 1024,
  LG: 1200,
  XLG: 1600,
};

export const AUTOSUGGEST_KEYWORD_BLACK_LIST = [
  'kulke:354', // Seniorit
];

export const DATE_TYPES = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
  WEEKEND: 'weekend',
  THIS_WEEK: 'this_week',
};

export const EVENT_STATUS = {
  EVENT_CANCELLED: 'EventCancelled',
  EVENT_SCHEDULED: 'EventScheduled',
};

export enum AUTOSUGGEST_TYPES {
  KEYWORD = 'keyword',
  TEXT = 'text',
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

export const MAIN_CONTENT_ID = 'maincontent';
