import forEach from "lodash/forEach";

import { SUPPORT_LANGUAGES } from "../constants";
import { LocalizedObject } from "../generated/graphql";
import { Language } from "../types";

export default (obj: LocalizedObject, language: Language) => {
  const languages = [
    language,
    ...Object.values(SUPPORT_LANGUAGES).filter(item => item !== language)
  ];
  let str = "";

  forEach(languages, lng => {
    const value = obj[lng];
    if (value) {
      str = value;
      return false;
    }
  });
  return str;
};
