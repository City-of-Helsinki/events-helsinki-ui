import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

import { formatDate } from "./dateUtils";

interface Filters {
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

interface MappedFilters {
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

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    end: formatDate(filters.end, "yyyy-MM-dd"),
    isFree: filters.isFree ? true : undefined,
    onlyChildrenEvents: filters.onlyChildrenEvents ? true : undefined,
    start: formatDate(filters.start, "yyyy-MM-dd")
  };

  if (newFilters.end || newFilters.start) {
    delete newFilters.dateTypes;
  }
  const query: string[] = [];

  forEach(newFilters, (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter) || typeof filter === "boolean") {
      if (isArray(filter)) {
        const items: Array<string | number> = [];

        forEach(filter, (item: string | number) => {
          items.push(encodeURIComponent(item));
        });

        query.push(`${key}=${items.join(",")}`);
      } else if (filter != null) {
        query.push(`${key}=${encodeURIComponent(filter)}`);
      }
    }
  });

  return query.length ? `?${query.join("&")}` : "";
};
