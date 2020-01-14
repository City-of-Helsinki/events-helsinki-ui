import forEach from "lodash/forEach";
import isArray from "lodash/isArray";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

import { formatDate } from "./dateUtils";

interface Filters {
  categories: string[];
  dateTypes: string[];
  districts: string[];
  endDate: Date | null;
  isCustomDate: boolean;
  keywords: string[];
  places: string[];
  publisher: string | null;
  search: string;
  startDate: Date | null;
}

interface MappedFilters {
  categories: string[];
  dateTypes?: string[];
  districts: string[];
  endDate?: string | null;
  keywords: string[];
  places: string[];
  publisher?: string | null;
  search: string;
  startDate?: string | null;
}

export const getSearchQuery = (filters: Filters): string => {
  const newFilters: MappedFilters = {
    ...filters,
    endDate: formatDate(filters.endDate, "yyyy-MM-dd"),
    startDate: formatDate(filters.startDate, "yyyy-MM-dd")
  };

  if (filters.isCustomDate) {
    delete newFilters.dateTypes;
  } else {
    delete newFilters.startDate;
    delete newFilters.endDate;
  }
  const query: string[] = [];

  forEach(newFilters, (filter, key) => {
    if (!isEmpty(filter) || isNumber(filter)) {
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
