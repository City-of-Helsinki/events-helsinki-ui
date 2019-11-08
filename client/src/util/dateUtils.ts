import { format as formatDateStr } from "date-fns";
import isNumber from "lodash/isNumber";

export const formatDate = (
  date: Date | number | null,
  format = "dd.MM.yyyy"
): string => {
  if (!date) {
    return "";
  }

  const d = isNumber(date) ? date : new Date(date);
  return formatDateStr(d, format);
};
