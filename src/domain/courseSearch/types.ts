export interface Filters {
  categories: string[];
  dateTypes: string[];
  divisions: string[];
  onlyOngoingCourses?: boolean;
  places: string[];
  text: string[];
  start: Date | null;
  end: Date | null;
}

export interface MappedFilters {
  categories: string[];
  dateTypes?: string[];
  divisions: string[];
  isFree?: boolean;
  onlyOngoingCourses?: boolean;
  places: string[];
  publisher?: string | null;
  text: string[];
  start: string | null;
  end: string | null;
}
