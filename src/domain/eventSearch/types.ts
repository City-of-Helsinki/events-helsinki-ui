import { COURSE_CATEGORIES, EVENT_CATEGORIES } from './constants';

export interface CategoryOption {
  icon: React.ReactElement;
  text: string;
  value: EVENT_CATEGORIES | COURSE_CATEGORIES;
}

export interface Filters {
  categories: string[];
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
}

export interface MappedFilters {
  categories: string[];
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
