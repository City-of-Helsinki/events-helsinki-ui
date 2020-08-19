export interface Filters {
  categories: string[];
  dateTypes: string[];
  divisions: string[];
  end: Date | null;
  isFree?: boolean;
  keywordNot: string[];
  keywords: string[];
  onlyChildrenEvents?: boolean;
  places: string[];
  publisher: string | null;
  start: Date | null;
  text: string;
}

export interface MappedFilters {
  categories: string[];
  dateTypes?: string[];
  divisions: string[];
  end?: string | null;
  isFree?: boolean;
  keywordNot: string[];
  keywords: string[];
  onlyChildrenEvents?: boolean;
  places: string[];
  publisher?: string | null;
  start?: string | null;
  text: string;
}
