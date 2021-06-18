import React from 'react';

import {
  COURSE_CATEGORIES,
  COURSE_HOBBY_TYPES,
  EVENT_CATEGORIES,
  EVENT_SEARCH_FILTERS,
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

export interface CategoryExtendedOption {
  icon: React.ReactElement;
  text: string;
  value: EVENT_CATEGORIES | COURSE_CATEGORIES | COURSE_HOBBY_TYPES;
}

export type SearchCategoryType = EVENT_CATEGORIES | COURSE_CATEGORIES | COURSE_HOBBY_TYPES

export interface SearchCategoryOption {
  icon: React.ReactElement;
  labelKey: string
}

export type SearchCategory = Record<SearchCategoryType, SearchCategoryOption>


export interface Filters {
  [EVENT_SEARCH_FILTERS.CATEGORIES]: string[];
  [EVENT_SEARCH_FILTERS.HOBBY_TYPES]?: string[];
  [EVENT_SEARCH_FILTERS.DATE_TYPES]: string[];
  [EVENT_SEARCH_FILTERS.DIVISIONS]: string[];
  [EVENT_SEARCH_FILTERS.END]: Date | null;
  [EVENT_SEARCH_FILTERS.IS_FREE]?: boolean;
  [EVENT_SEARCH_FILTERS.KEYWORD]?: string[];
  [EVENT_SEARCH_FILTERS.KEYWORD_NOT]?: string[];
  [EVENT_SEARCH_FILTERS.ONLY_CHILDREN_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.ONLY_EVENING_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.ONLY_REMOTE_EVENTS]?: boolean;
  [EVENT_SEARCH_FILTERS.ALSO_ONGOING_COURSES]?: boolean;
  [EVENT_SEARCH_FILTERS.PLACES]: string[];
  [EVENT_SEARCH_FILTERS.PUBLISHER]?: string | null;
  [EVENT_SEARCH_FILTERS.START]: Date | null;
  [EVENT_SEARCH_FILTERS.TEXT]: string[];
  [EVENT_SEARCH_FILTERS.SUITABLE]?: number[];
  // [EVENT_SEARCH_FILTERS.MIN_AGE]?: string;
  // [EVENT_SEARCH_FILTERS.MAX_AGE]?: string;
}

export type MappedFilters = Partial<Omit<Filters, 'start' | 'end'>> & {
  [EVENT_SEARCH_FILTERS.START]?: string | null;
  [EVENT_SEARCH_FILTERS.END]?: string | null;
};
