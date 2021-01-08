import {
  COURSE_CATEGORIES,
  COURSE_HOBBY_TYPES,
  EVENT_CATEGORIES,
} from './constants';

export interface CategoryOption {
  icon: React.ReactElement;
  text: string;
  value: EVENT_CATEGORIES | COURSE_CATEGORIES;
}

export interface HobbyTypeOption {
  icon: React.ReactElement;
  text: string;
  value: COURSE_HOBBY_TYPES;
}

export interface Filters {
  categories: string[];
  hobbyTypes?: string[];
  dateTypes: string[];
  divisions: string[];
  end: Date | null;
  isFree?: boolean;
  keyword?: string[];
  keywordNot?: string[];
  onlyChildrenEvents?: boolean;
  onlyEveningEvents?: boolean;
  alsoOngoingCourses?: boolean;
  places: string[];
  publisher?: string | null;
  start: Date | null;
  text: string[];
  minAge?: string;
  maxAge?: string;
}

export interface MappedFilters {
  categories: string[];
  hobbyTypes?: string[];
  dateTypes?: string[];
  divisions: string[];
  end?: string | null;
  isFree?: boolean;
  keyword?: string[];
  keywordNot?: string[];
  onlyChildrenEvents?: boolean;
  onlyEveningEvents?: boolean;
  alsoOngoingCourses?: boolean;
  places: string[];
  publisher?: string | null;
  start?: string | null;
  text: string[];
}
