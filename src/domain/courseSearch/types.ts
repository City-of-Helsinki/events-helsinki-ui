export interface Filters {
  categories: string[];
  dateTypes: string[];
  divisions: string[];
  places: string[];
  text: string[];
  start: Date | null;
  end: Date | null;
  isFree?: boolean;
  alsoOngoingCourses?: boolean;
}

export interface MappedFilters {
  categories: string[];
  dateTypes?: string[];
  divisions: string[];
  isFree?: boolean;
  alsoOngoingCourses?: boolean;
  places: string[];
  publisher?: string | null;
  text: string[];
  start: string | null;
  end: string | null;
}
